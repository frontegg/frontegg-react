import React, { FC, useEffect } from 'react';
import { useAuditsActions } from '../helpers/hooks';

export const AuditsListener: FC = () => {
  const { initData } = useAuditsActions();
  useEffect(() => {
    initData();
  }, []);
  return null;
};
