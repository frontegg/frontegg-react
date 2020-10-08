import React, { FC } from 'react';

export type OnError = {
  // triggered if change password failed. return true to override the default behavior
  onError?: (error: any) => boolean;
};
type ErrorMessageProps = OnError & {
  style?: object;
  error?: any;
  separator?: boolean;
};
export const ErrorMessage: FC<ErrorMessageProps> = ({ error, separator, onError, style }) => {
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
      <div className='fe-error-message' style={style}>
        <ul>
          {error.split(', ').map((err: string) => (
            <li>{err}</li>
          ))}
        </ul>
      </div>
    );
  }
  return <div className='fe-error-message' style={style}>{error}</div>;
};
