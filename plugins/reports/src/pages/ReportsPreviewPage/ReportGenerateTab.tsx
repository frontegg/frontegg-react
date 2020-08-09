import React from 'react';
import { Checkbox, Dropdown, Form } from 'semantic-ui-react';
import { Button, Input } from '../../../../elements';
import { SettingSVG } from '../../../../components/Icons';
import { DataFilter, DataFilterMultiSelect, DataFilterNumber, DataFilterSelect, DataFilterText } from '../../../../api/ReportsApi';
import { connectFrontegg, IFronteggMapper } from '../../../../providers/StateProvider';

export interface IReportGenerateTab {
}

const generateTypes = [
  { label: 'PDF', value: 'pdf' },
  { label: 'JPEG', value: 'image' },
  { label: 'Inline', value: 'html' },
];

const mapper = ({
                  state: { reportById, generatingReportById, sendingReportById },
                  actions: { generateReportById, sendReportById, debounceRenderReportById },
                }: IFronteggMapper) => ({
  reportById,
  generatingReportById,
  generateReportById,
  debounceRenderReportById,
  sendingReportById,
  sendReportById,
});

export class _ReportGenerateTab extends React.Component<IReportGenerateTab & ReturnType<typeof mapper>, {
  generateType: string;
  sendTo: string,
  filters: any
}> {
  state = {
    generateType: 'pdf',
    sendTo: '',
    filters: {},
  };

  downloadReport = () => {
    const { reportById: { data: report }, generateReportById } = this.props;
    const { generateType } = this.state;
    if (report == null) {
      return;
    }
    generateReportById({
      id: report.id,
      name: report.name,
      responseType: generateType as any,
    });
  };

  sendReport = () => {
    const { reportById: { data: report }, sendReportById } = this.props;
    const { sendTo } = this.state;
    if (report == null) {
      return;
    }
    sendReportById({ templateId: report.id, to: [sendTo] });
  };

  handleParameterChanged = (newState: any) => {
    const { reportById: { data: report }, debounceRenderReportById } = this.props;
    if (report == null) {
      return;
    }
    this.setState(newState, () => {
      debounceRenderReportById({
        id: report.id,
        dataFilters: this.state.filters,
        responseType: 'html',
      });
    });
  };

  generateTextParameter = ({ name, label, defaultValue, placeholder, validation, validationError }: DataFilterText,
                           handleParameterChanged: (state: any) => void) => {
    return <Input key={name} name={name}
                  label={label}
                  className='mb-3'
                  fullWidth={true}
                  placeholder={placeholder}
                  value={(this.state.filters as any)[name] || defaultValue}
                  onChange={e => handleParameterChanged({
                    filters: {
                      ...this.state.filters,
                      [name]: e.target.value,
                    },
                  })}
    />;
  };

  generateNumberParameter = ({ name, label, defaultValue, placeholder }: DataFilterNumber,
                             handleParameterChanged: (state: any) => void) => {
    return <Input key={name} name={name}
                  label={label}
                  className='mb-3'
                  type='number'
                  fullWidth={true}
                  placeholder={placeholder}
                  value={(this.state.filters as any)[name] || defaultValue}
                  onChange={e => handleParameterChanged({
                    filters: {
                      ...this.state.filters,
                      [name]: e.target.value,
                    },
                  })}
    />;
  };


  generateSelectParameter = ({ name, label, defaultValue, placeholder, options }: DataFilterSelect,
                             handleParameterChanged: (state: any) => void) => {
    return <Form.Field key={name} className='mb-3' width={16}>
      <label>{label}</label>
      <Form.Select
        value={(this.state.filters as any)[name] || defaultValue || ''}
        placeholder={placeholder}
        options={options.map(t => ({ text: t.label, value: t.value }))}
        fluid
        onChange={(e, data) => handleParameterChanged({
          filters: {
            ...this.state.filters,
            [name]: data.value,
          },
        })}/>
    </Form.Field>;
  };

  generateMultiSelectParameter = ({ name, label, defaultValue, placeholder, options }: DataFilterMultiSelect,
                                  handleParameterChanged: (state: any) => void) => {
    return <Form.Field key={name} className='mb-3' width={16}>
      <label>{label}</label>
      <Dropdown
        placeholder={placeholder}
        fluid
        search
        selection
        multiple
        value={(this.state.filters as any)[name] || defaultValue || ''}
        options={options.map(t => ({ text: t.label, value: t.value }))}
        onChange={(e, data) => handleParameterChanged({
          filters: {
            ...this.state.filters,
            [name]: data.value,
          },
        })}
      />
    </Form.Field>;
  };

  generateParameters = (dataFilters: DataFilter[]) => {

    return dataFilters.map(filter => {
      switch (filter.type) {
        case 'text':
          return this.generateTextParameter(filter as DataFilterText, this.handleParameterChanged);
        case 'number':
          return this.generateNumberParameter(filter as DataFilterNumber, this.handleParameterChanged);
        case 'select':
          return this.generateSelectParameter(filter as DataFilterSelect, this.handleParameterChanged);
        case 'multi-select':
          return this.generateMultiSelectParameter(filter as DataFilterMultiSelect, this.handleParameterChanged);
      }
      return null;
    }).filter(d => d != null);
  };

  render() {
    const { sendTo } = this.state;
    const {
      generatingReportById: { loading: downloadLoading },
      sendingReportById: { loading: sendLoading },
      reportById: { data: report },
    } = this.props;
    if (!report) {
      return null;
    }
    return <>

      {report.dataFilters && <div className='fe-section-header'>
        <SettingSVG className='fe-section-header__icon'/>
        <span className='fe-section-header__title'>Parameters</span>
      </div>}
      <Form className='mb-4'>
        {report.dataFilters && this.generateParameters(report.dataFilters.map(d => d.config))}
      </Form>
      <div className='fe-generate-container'>
        <div className='fe-section-header'>
          {/*<img alt='Generate Report' className='fe-section-header__icon' src={ShareIcon}/>*/}
          <span className='fe-section-header__title'>Generate Report</span>
        </div>
        <Form className='mb-4'>
          <Form.Field>
            <label className='mb-3'>File Type</label>
            {generateTypes.map(({ label, value }) => <Checkbox
              key={value}
              radio
              label={label}
              name='generate_report_type'
              value={value}
              checked={this.state.generateType === value}
              onChange={(e, data) => this.setState({ generateType: data.value as string })}
            />)}
          </Form.Field>
        </Form>

        <Input className='mb-4'
               value={sendTo}
               onChange={(e => this.setState({ sendTo: e.target.value }))}
               action={{
                 children: 'Send',
                 disabled: sendTo.length == 0,
                 onClick: this.sendReport,
               }}
               placeholder='E-mail address...'
               fullWidth={true}
               disabled={sendLoading}
               loading={sendLoading}/>
        <Button fullWidth={true}
                onClick={this.downloadReport}
                disabled={downloadLoading}
                loading={downloadLoading}>
          Download
        </Button>
      </div>
    </>;
  }
}

export const ReportGenerateTab = connectFrontegg(_ReportGenerateTab, mapper);
