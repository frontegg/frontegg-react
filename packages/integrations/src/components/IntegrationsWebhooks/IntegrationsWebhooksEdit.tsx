import { Tabs, useSelector } from '@frontegg/react-core';
import React, { FC, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { IPluginState } from '../../interfaces';
import { filterCategories } from '../../utils';
import { IntegrationsWebhooksForm } from './IntegrationsWebhooksForm';
import { IntegrationsWebhooksLog } from './IntegrationsWebhooksLog';
import { IWebhookLocationState } from './interfaces';

const items = ['Details', 'Logs'].map((el) => () => <>{el}</>);

export const IntegrationsWebhooksEdit: FC = () => {
  const {
    replace: historyReplace,
    location: { state: locationState, ...location },
  } = useHistory<IWebhookLocationState>();

  const { webhook } = useSelector(({ integrations: { webhook } }: IPluginState) => ({
    webhook,
  }));

  const data = webhook?.find(({ _id }) => _id === locationState.id);

  const onChangeTab = useCallback(
    (event: React.MouseEvent<HTMLDivElement>, activeIndex: number) => {
      historyReplace({ ...location, state: { ...locationState, view: activeIndex === 1 ? 'log' : 'edit' } });
    },
    [historyReplace, location, locationState]
  );

  return (
    <div>
      <div>{data?.displayName ?? 'Add New Hook'}</div>
      <Tabs items={items} activeTab={locationState.view === 'edit' ? 0 : 1} onTabChange={onChangeTab} />
      {locationState.view === 'edit' ? <IntegrationsWebhooksForm data={data ?? null} /> : <IntegrationsWebhooksLog />}
    </div>
  );
};
