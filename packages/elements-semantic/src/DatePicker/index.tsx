import React from 'react';
import { DatePickerProps } from '@frontegg/react-core';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import './style.scss';

const mapper = (props: DatePickerProps): any => {
  const { format, fullWidth, ...rest } = props;
  return {
    ...rest,
    className: fullWidth ? 'full-width' : '',
    format: format || 'DD/MM/YYYY',
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

  componentDidUpdate() {
    const { fullWidth } = this.props;
    if (fullWidth) {
      Array.from(document.getElementsByClassName('field') as HTMLCollectionOf<HTMLElement>).forEach((val) => {
        val.style.width = '100%';
      });
    }
  }

  componentDidMount() {
    const { fullWidth } = this.props;
    if (fullWidth) {
      Array.from(document.getElementsByClassName('field') as HTMLCollectionOf<HTMLElement>).forEach((val) => {
        val.style.width = '100%';
      });
    }
  }

  onChangeDate = (event: any, data: any) => {
    const { value } = this.props;
    this.setState({ selectedDate: data?.value });
    if (value && data) {
      value.setTime(data.value.getTime());
    }
  };
  render() {
    const { onChange, value, ...rest } = this.props;
    const datePickerProps = mapper(rest);
    const { selectedDate } = this.state as any;
    value?.setTime(selectedDate.getTime());

    return <SemanticDatepicker {...datePickerProps} onChange={this.onChangeDate} value={selectedDate} />;
  }
}
