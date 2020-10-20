import React from 'react';
import { DatePickerProps } from '@frontegg/react-core';
import { MuiPickersUtilsProvider, KeyboardDatePicker, KeyboardDateTimePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

const mapper = (props: DatePickerProps): any => {
  const { defaultValue, onChange, ...rest } = props;
  return {
    ...rest,
    variant: 'inline',
  } as any;
};

export class DatePicker extends React.Component<DatePickerProps> {
  constructor(props: DatePickerProps) {
    super(props);
    const { defaultValue } = props;
    this.state = {
      selectedDate: defaultValue || new Date(),
    };
  }

  onChangeDate = (date: MaterialUiPickersDate) => {
    const { value } = this.props;
    this.setState({ selectedDate: date?.toDate() });
    if (value && date) {
      value.setTime(date.toDate().getTime());
    }
  };
  render() {
    const { onChange, withTime, value, ...rest } = this.props;
    const datePickerProps = mapper(rest);
    const { selectedDate } = this.state as any;
    value?.setTime(selectedDate.getTime());

    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        {withTime ? (
          <KeyboardDateTimePicker {...datePickerProps} value={selectedDate} onChange={this.onChangeDate} />
        ) : (
          <KeyboardDatePicker {...datePickerProps} value={selectedDate} onChange={this.onChangeDate} />
        )}
      </MuiPickersUtilsProvider>
    );
  }
}
