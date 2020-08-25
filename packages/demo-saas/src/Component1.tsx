import React from 'react';
import { useT } from '@frontegg/react-core';

export const Component1 = () => {

  const { t } = useT();

  return <div>
    TEST: {t('reports.list-page.title')}
  </div>;
};
