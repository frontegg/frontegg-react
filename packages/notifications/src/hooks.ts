import { actions } from './Api';
import { NotificationsState } from './Api';
import { bindActionCreators } from '@reduxjs/toolkit';
import { memoEqual, useDispatch, useSelector } from '@frontegg/react-core';

type NotificationsStateMapper<S extends object> = (state: NotificationsState) => S;
const defaultNotificationsStateMapper: any = (state: NotificationsState) => ({ ...state });

export const useNotificationsState = <S extends object>(
  stateMapper: NotificationsStateMapper<S> = defaultNotificationsStateMapper
): S => {
  const dispatch = useDispatch();
  const notificationsState = useSelector(
    ({ notificationsState }: { notificationsState: NotificationsState }) => stateMapper(notificationsState),
    memoEqual
  );
  const bindedActions = bindActionCreators(actions, dispatch);
  return { ...notificationsState, actions: bindedActions };
};

export const useNotificationsActions = (): typeof actions => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...actions,
    },
    dispatch
  );
};
