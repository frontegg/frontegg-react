import React, { FC } from 'react';
import { useT } from '@frontegg/react-core';
import { Login, LoginSuccessRedirectProps } from '@frontegg/react-auth';

export const Component1 = () => {

  const { t } = useT();

  return <div style={{ width: 300 }}>
    <Login components={{
      LoginSuccessRedirect: {
        renderer: (props) => {
          return 'asd';
        },
      },
    }}/>
    TEST: {t('reports.list-page.title')}
  </div>;
};
