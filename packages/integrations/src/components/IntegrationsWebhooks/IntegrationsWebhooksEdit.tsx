import React, { FC, useCallback, useLayoutEffect } from 'react';
import { Button, Icon, Tabs, usePrevious, useSelector } from '@frontegg/react-core';
import { useHistory } from 'react-router-dom';
import { IPluginState } from '../../interfaces';
import { IntegrationsWebhooksForm } from './IntegrationsWebhooksForm';
import { IntegrationsWebhooksLog } from './IntegrationsWebhooksLog';
import { IWebhookLocationState } from './interfaces';

const items = ['Details', 'Logs'].map((el) => () => <>{el}</>);

export const IntegrationsWebhooksEdit: FC = () => {
  const {
    replace: historyReplace,
    location: { state: locationState, ...location },
  } = useHistory<IWebhookLocationState>();

  const { webhook, isSaving } = useSelector(({ integrations: { webhook, isSaving } }: IPluginState) => ({
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
    <div>
      <div>
        <Button transparent onClick={onBack}>
          <Icon name='left-arrow' />
        </Button>
        {data?.displayName ?? 'Add New Hook'}
      </div>
      <Tabs items={items} activeTab={locationState.view === 'edit' ? 0 : 1} onTabChange={onChangeTab} />
      {locationState.view === 'edit' ? <IntegrationsWebhooksForm data={data ?? null} /> : <IntegrationsWebhooksLog />}
    </div>
  );
};
