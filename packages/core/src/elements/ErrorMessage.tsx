import React, { FC } from 'react';

type ErrorMessageProps = {
  error?: any;
  separator?: boolean;
};
export const ErrorMessage: FC<ErrorMessageProps> = ({ error, separator }) => {
  if (!error) {
    return null;
  }

  if (separator && error.indexOf(', ') !== -1) {
    return (
      <div className='fe-error-message'>
        <ul>
          {error.split(', ').map((err: string) => (
            <li>{err}</li>
          ))}
        </ul>
      </div>
    );
  }
  return <div className='fe-error-message'>{error}</div>;
};
