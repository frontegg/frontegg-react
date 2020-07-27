import React from 'react';
import cronParser from 'cron-parser';
import * as cronUtils from '../../../../helpers/cronUtils';
import moment from 'moment';
import { Form } from 'semantic-ui-react';
import { Input } from '../../../../elements';
import { CalendarSVG, SettingSVG } from '../../../../components/Icons';
import { Logger } from '../../../../helpers';
import { connectFrontegg, IFronteggMapper } from '../../../../providers/StateProvider';

const mapper = ({ state: { reportById, updatingReportById }, actions: { updateReportById } }: IFronteggMapper) => ({
  updateLoading: updatingReportById?.loading ?? false,
  reportById,
  updateReportById,
});

export type  IReportScheduleTab = {}

class _ReportScheduleTab extends React.Component<IReportScheduleTab & ReturnType<typeof mapper>> {
  state = {
    active: false,
    intervalType: cronUtils.INTERVAL_TYPE[1].value,
    intervalCron: '0 0 12 * * 2',
    intervalDayInWeek: cronUtils.INTERVAL_DAY_IN_WEEK[0].value,
    intervalDayInMonth: cronUtils.INTERVAL_DAY_IN_MONTH[0].value,
    intervalHour: cronUtils.INTERVAL_HOURS[11].value,
    intervalMinutes: cronUtils.INTERVAL_MINUTES[0].value,
  };

  constructor(props: IReportScheduleTab & ReturnType<typeof mapper>) {
    super(props);
    const { reportById: { data: report } } = this.props;
    if (report == null) {
      return;
    }

    let initialState: any = {};
    if (report.schedule) {
      initialState = {
        active: report.schedule.active,
        ...cronUtils.cronToFields(report.schedule.cron, report.schedule.interval),
      };
    }
    this.state = { ...this.state, ...initialState };
  }

  getUserTimeZone = () => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch (e) {
      return 'UTC';
    }
  };
  dailyIntervalComponents = () => {
    return (
      <div className='fe-row-components'>
        {this.createSelectElement('Interval', 'intervalType', cronUtils.INTERVAL_TYPE)}
        {this.createSelectElement('Hour', 'intervalHour', cronUtils.INTERVAL_HOURS, '25%')}
        {this.createSelectElement('Minutes', 'intervalMinutes', cronUtils.INTERVAL_MINUTES, '25%')}
      </div>
    );
  };
  weeklyIntervalComponents = () => {
    return (
      <div className='fe-row-components'>
        {this.createSelectElement('Interval', 'intervalType', cronUtils.INTERVAL_TYPE)}
        {this.createSelectElement('At Day', 'intervalDayInWeek', cronUtils.INTERVAL_DAY_IN_WEEK)}
        {this.createSelectElement('Hour', 'intervalHour', cronUtils.INTERVAL_HOURS, '25%')}
        {this.createSelectElement('Minutes', 'intervalMinutes', cronUtils.INTERVAL_MINUTES, '25%')}
      </div>
    );
  };
  monthlyIntervalComponents = () => {
    return (
      <div className='fe-row-components'>
        {this.createSelectElement('Interval', 'intervalType', cronUtils.INTERVAL_TYPE)}
        {this.createSelectElement('At Day', 'intervalDayInMonth', cronUtils.INTERVAL_DAY_IN_MONTH)}
        {this.createSelectElement('Hour', 'intervalHour', cronUtils.INTERVAL_HOURS, '25%')}
        {this.createSelectElement('Minutes', 'intervalMinutes', cronUtils.INTERVAL_MINUTES, '25%')}

        {this.state.intervalDayInMonth >= 29 && (
          <div className='fe-warning-note'>
            <b>WARNING:</b> Days greater than 28 may skip months
          </div>
        )}
      </div>
    );
  };
  customIntervalComponents = () => {
    const { intervalCron } = this.state;
    return <div className='fe-row-components'>
      {this.createSelectElement('Interval', 'intervalType', cronUtils.INTERVAL_TYPE)}

      <Form.Field width={8}>
        <label>Cron Expression</label>
        <Input
          value={intervalCron}
          placeholder={'Ex.: * * * * 1 means every Sunday'}
          validateFunction={(str: string) => {
            try {
              cronParser.parseExpression(str);
              return true;
            } catch (e) {
              return false;
            }
          }}
          onChange={(e: any) => {
            this.handleChange('intervalCron')(e.target.value);
          }}
        />
      </Form.Field>
    </div>;
  };
  intervalComponents = () => {
    const { intervalType } = this.state;

    switch (intervalType) {
      case 'daily':
        return this.dailyIntervalComponents();
      case 'weekly':
        return this.weeklyIntervalComponents();
      case 'monthly':
        return this.monthlyIntervalComponents();
      case 'custom':
        return this.customIntervalComponents();
    }
  };
  createSelectElement = (title: string, stateKey: string, options: any[], width: string = '50%') => {
    return <Form.Field className='mb-3' width={8}>
      <label>{title}</label>
      <Form.Select value={(this.state as any)[stateKey]}
                   options={options}
                   onChange={(e, data) => {
                     this.handleChange(stateKey)(data.value);
                   }}/>
    </Form.Field>;
  };

  handleChange = (key: string) => {
    return (e: any) => {
      this.setState({ [key]: e }, this.updateReport);
    };
  };

  updateReport = () => {
    const { active, intervalType } = this.state;
    const { reportById: { data: report }, updateReportById } = this.props;
    const cron = cronUtils.fieldsToCron({ ...this.state } as cronUtils.CronFields);

    if (report == null) {
      Logger.error('updateReport() report must not be null');
      return;
    }
    updateReportById({
      templateId: report.id,
      schedule: {
        active,
        interval: intervalType as any,
        cron,
        tz: this.getUserTimeZone(),
      },
      type: 'html',
      status: report.status,
    });
  };

  intervalFooter = () => {
    const { intervalType, intervalCron } = this.state;
    const timeZone = this.getUserTimeZone();
    let components = null;
    if (intervalType === 'custom') {
      try {
        const cronIterator = cronParser.parseExpression(intervalCron, {
          currentDate: new Date(),
        });
        components = [1, 2, 3].map(i => (
          <div className='fe-row-component-label'>
            {moment(cronIterator.next().toDate()).format(`[${i})] DD/MM/YYYY HH:mm:ss`)}
          </div>
        ));
      } catch (e) {
        components = <div className='fe-row-component-label'>Invalid Cron syntax</div>;
      }
    }
    return <div className='fe-row-component fe-row-component-grey mb-4'>
      {components && <div className='fe-row-component-header'>Cron Expression Results:</div>}
      {components}
      <div className='fe-row-component-header'>TimeZone: {timeZone}</div>
    </div>;
  };

  render() {
    const { active } = this.state;
    const { reportById: { data: report } } = this.props;
    if (report == null) {
      return null;
    }

    return <div>
      {report.dataFilters && <div className='fe-section-header'>
        <SettingSVG className='fe-section-header__icon'/>
        <span className='fe-section-header__title'>Parameters</span>
      </div>}
      {/*{report.dataFilters && this.generateParameters(report.dataFilters.map(d => ({ type: d.type, ...d.config })))}*/}

      <div className='fe-generate-container'>
        <div className='fe-section-header'>
          <CalendarSVG className='fe-section-header__icon'/>
          <span className='fe-section-header__title'>Schedule Setting</span>
        </div>
        <Form>
          <Form.Field className='mb-2'>
            {/*<SwitchButton value={active} onChange={this.handleChange('active')}/>*/}
          </Form.Field>
          {this.intervalComponents()}
          {this.intervalFooter()}

        </Form>
      </div>
    </div>;
  }
}

export const ReportScheduleTab = connectFrontegg(_ReportScheduleTab, mapper);
