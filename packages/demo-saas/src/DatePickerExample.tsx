import React, { FC } from 'react';
import { Elements } from '@frontegg/react-core';
import { uiLibrary as M } from '@frontegg/react-elements-material-ui';
import { uiLibrary as S } from '@frontegg/react-elements-semantic';

const ME = M as Elements;
// const ME = S as Elements;

export const DatePickerExample: FC = () => {
  const date: Date | undefined = new Date();
  return (
    <div style={{ textAlign: 'center' }}>
      <h4>Material DatePicker</h4>
      <ME.DatePicker
        label={'date label'}
        value={date}
        format={'DD/MM/YYYY hh:mm'}
        minDate={new Date(1423311111000)}
        defaultValue={new Date(1423311111111)}
        withTime={true}
        fullWidth={false}
      />
    </div>
  );
};
