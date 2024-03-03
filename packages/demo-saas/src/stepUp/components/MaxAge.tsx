import React from 'react';

export const MaxAge = ({ maxAge }: { maxAge?: number }) => {
  if (maxAge) {
    return (
      <div>
        Max age is <span style={{ color: '#1665c0' }}>{maxAge}</span>
      </div>
    );
  }

  return (
    <div>
      <span style={{ color: 'red' }}>No</span> max age
    </div>
  );
};
