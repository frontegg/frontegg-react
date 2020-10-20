import React, { FC } from 'react';
import { uiLibrary as M } from '@frontegg/react-elements-material-ui';
import { uiLibrary as S } from '@frontegg/react-elements-semantic';
import { Elements, fronteggElements as FE } from '@frontegg/react-core';

const Semantic = S as Elements;
const Material = M as Elements;
const Frontegg = FE as Elements;

export const DatePickerExample: FC = () => {
  const date: Date | undefined = new Date();
  return (
    <div style={{ textAlign: 'center' }}>
      <h4>Material DatePicker</h4>
      <Material.DatePicker
        label={'date label'}
        value={date}
        format={'DD/MM/yyyy hh:mm'}
        minDate={new Date(1423311111000)}
        defaultValue={new Date(1423311111111)}
        withTime={true}
        fullWidth={false}
      />
      <h4>Semantic DatePicker</h4>
      <Semantic.DatePicker
        label={'date label'}
        value={date}
        format={'DD/MM/YYYY hh:mm'}
        minDate={new Date(1423311111000)}
        defaultValue={new Date(1423311111111)}
        withTime={true}
        fullWidth={false}
      />
      <h4>Frontegg DatePicker</h4>
      <Frontegg.DatePicker
        label={'date label'}
        value={date}
        format={'dd/MM/yyyy hh:mm'}
        minDate={new Date(1423311111000)}
        defaultValue={new Date(1423311111111)}
        withTime={true}
        fullWidth={false}
      />
    </div>
  );
};
