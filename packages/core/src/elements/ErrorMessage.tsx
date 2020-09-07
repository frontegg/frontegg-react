import React from 'react';

export const ErrorMessage = ({ error }: any) => {
  if (!error) {
    return null;
  }

  if (error.indexOf(', ') !== -1) {
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
