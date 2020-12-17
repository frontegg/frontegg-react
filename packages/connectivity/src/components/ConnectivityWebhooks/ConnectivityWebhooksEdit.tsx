import React, { FC, useCallback, useLayoutEffect, useMemo } from 'react';
import { Button, Icon, Tabs, usePrevious, useSelector, useT } from '@frontegg/react-core';
import { useHistory } from 'react-router-dom';
import { IPluginState } from '../../interfaces';
import { ConnectivityWebhooksForm } from './ConnectivityWebhooksForm';
import { ConnectivityWebhooksLog } from './ConnectivityWebhooksLog';
import { IWebhookLocationState } from './interfaces';
import classNames from 'classnames';

const itemsArray = ['common.detail', 'common.logs'];

export const ConnectivityWebhooksEdit: FC = () => {
  const { t } = useT();
  const items = useMemo(() => itemsArray.map((el) => () => <>{t(el)}</>), [t]);

  const {
    replace: historyReplace,
    location: { state: locationState, ...location },
  } = useHistory<IWebhookLocationState>();

  const { webhook, isSaving } = useSelector(({ connectivity: { webhook, isSaving } }: IPluginState) => ({
    webhook,
    isSaving,
  }));

  const prevIsSaving = usePrevious(isSaving);

  const data = webhook?.find(({ _id }) => _id === locationState.id);

  const onBack = useCallback(() => {
    historyReplace({ ...location, state: { ...locationState, view: 'list', id: undefined } });
  }, [historyReplace, location, locationState]);

  useLayoutEffect(() => {
    prevIsSaving && !isSaving && onBack();
  }, [prevIsSaving, isSaving, onBack]);

  const onChangeTab = useCallback(
    (event: React.MouseEvent<HTMLDivElement>, activeIndex: number) => {
      historyReplace({ ...location, state: { ...locationState, view: activeIndex === 1 ? 'log' : 'edit' } });
    },
    [historyReplace, location, locationState]
  );

  return (
    <div className='fe-connectivity__content'>
      <div className='fe-connectivity__content-heading'>
        <span onClick={onBack} className={'fe-back-button fe-block'}><Icon name='back' /></span>
        {data?.displayName ?? t('connectivity.addNewHook')}
      </div>
      {data && <Tabs items={items} activeTab={locationState.view === 'edit' ? 0 : 1} onTabChange={onChangeTab} />}
      {locationState.view === 'edit' ? <ConnectivityWebhooksForm data={data ?? null} /> : <ConnectivityWebhooksLog />}
    </div>
  );
};
