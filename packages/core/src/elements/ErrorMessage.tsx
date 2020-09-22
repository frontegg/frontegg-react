import React, { FC } from 'react';

export type OnError = {
  // triggered if change password failed. return true to override the default behavior
  onError?: (error: any) => boolean;
}
type ErrorMessageProps = OnError & {
  error?: any;
  separator?: boolean;
};
export const ErrorMessage: FC<ErrorMessageProps> = ({ error, separator, onError }) => {
  if (!error) {
    return null;
  }
  if (onError) {
    if (onError(error)) {
      return null;
    }
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
