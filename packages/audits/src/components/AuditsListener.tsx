import React, { FC, useEffect } from 'react';
import { useAuditsActions } from '../helpers/hooks';
import { AuditsActions, storeName } from '../Api';
import { ListenerProps } from '@frontegg/react-core';

export const AuditsListener: FC<ListenerProps<AuditsActions>> = (props) => {
  const actions = useAuditsActions();

  useEffect(() => {
    props.resolveActions?.(storeName, actions);
  }, [props.resolveActions, actions]);
  return null;
};
