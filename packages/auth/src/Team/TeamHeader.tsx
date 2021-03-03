import React, { FC } from 'react';
import { PageHeader, PageHeaderProps, useT } from '@frontegg/react-core';
import classNames from 'classnames';
import { useAuth } from '@frontegg/react-hooks/auth';

export type TeamHeaderProps = PageHeaderProps;

export const TeamHeader: FC<TeamHeaderProps> = (props) => {
  const { t } = useT();
  const { loaders, totalItems } = useAuth((state) => state.teamState);
  const customProps: Partial<PageHeaderProps> = {
    className: classNames('fe-team__header', props.className),
    title: props.title ?? t('auth.team.title'),
    subTitle:
      props.subTitle ??
      (loaders.USERS ? t('common.loading') : t('auth.team.subtitle', { totalItems: `${totalItems ?? 0}` })),
  };
  return <PageHeader {...props} {...customProps} />;
};
