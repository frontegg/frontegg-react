import React from 'react';
import { useT } from '@frontegg/react-core';
import { Login, LoginPage } from '@frontegg/react-auth';

export const Component1 = () => {

  const { t } = useT();

  return <div style={{ width: 300 }}>
    TEST: {t('reports.list-page.title')}
  </div>;
};
