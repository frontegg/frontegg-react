import React, { FC, useEffect } from 'react';
import { useAudits } from '../hooks';

export const AuditsListener: FC = () => {
  const { initData } = useAudits();
  useEffect(() => {
    initData();
  }, []);
  return null;
};
