import React from 'react';
import { Consumer } from './context';

export const FirstComp = () => {
  return (
    <Consumer>
      {({ counter }) => {
        return (
          <div className='my-first-comp'>
            <span style={{ color: 'blue' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;React</span> My Counter:{' '}
            {counter} <b>(Counter is from FronteggProvider React.Context)</b>
          </div>
        );
      }}
    </Consumer>
  );
};
