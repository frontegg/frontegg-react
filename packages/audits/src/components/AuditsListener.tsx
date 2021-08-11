import React, { FC, useEffect } from 'react';
import { useAuditsActions } from '../helpers/hooks';
import { OldAuditsActions, storeName } from '@frontegg/redux-store';
import { ListenerProps } from '@frontegg/react-core';

export const AuditsListener: FC<ListenerProps<OldAuditsActions>> = (props) => {
  const actions = useAuditsActions();

  useEffect(() => {
    props.resolveActions?.(storeName, actions);
  }, [props.resolveActions, actions]);
  return null;
};
