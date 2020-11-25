import React, { FC, useEffect, useMemo } from 'react';
import { Grid, useSelector, Loader, useDispatch } from '@frontegg/react-core';
import { SlackIcon } from '../../elements/ConnectivityIcons';
import { IPluginState } from '../../interfaces';
import { connectivityActions } from '../../reducer';

const defaultScope = ['chat:write', 'channels:read', 'chat:write.public', 'users:read', 'users:read.email'];

export const ConnectivitySlackAuth: FC<any> = () => {
  const dispatch = useDispatch();
  const { isLoadingScope, clientId = '' } = useSelector(
    ({
      connectivity: {
        slackChannels: { isLoadingScope, clientId },
      },
    }: IPluginState) => ({
      isLoadingScope,
      clientId,
    })
  );

  useEffect(() => {
    dispatch(connectivityActions.loadScope());
  }, []);

  const redirectUrl = (() => {
    const url = new URL(window.location.href);
    url.search = '';
    url.hash = '';
    return `${url.toString()}/success`;
  })();

  const getSlackScope = (): string => {
    const set = new Set([...defaultScope]);
    return Array.from(set).join(',');
  };

  const query = useMemo(() => {
    return new URLSearchParams({ client_id: clientId, scope: getSlackScope(), redirect_uri: redirectUrl });
  }, [clientId]);

  if (isLoadingScope) {
    return <Loader center />;
  }

  if (!isLoadingScope && !clientId) {
    return <> Required configure the connectivity</>;
  }

  return (
    <Grid container justifyContent='center'>
      <div className='fe-slack-auth'>
        <div className='fe-slack-auth-container'>
          <div className='fe-slack-auth__txt-strong'>
            Slack integration allow your Slack account to be notified
            <br />
            when certain events happen.
          </div>
          <div className='fe-slack-auth__txt'>
            When the specified events happen, we’ll send a customized
            <br />
            message to the Slack channels of your choice.
          </div>
          <div className='fe-slack-auth__txt-strong'>The first stage would be to connect your Slack Account.</div>
          <br />
          <a href={`https://slack.com/oauth/v2/authorize?${query.toString()}`} className='fe-slack-auth__btn'>
            <SlackIcon />
            <span>Connect with Slack</span>
          </a>
        </div>
      </div>
    </Grid>
  );
};
