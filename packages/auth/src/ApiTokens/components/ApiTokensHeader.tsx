import React, { FC, useEffect, useState, useCallback } from 'react';
import { PageHeader, PageHeaderProps, useT } from '@frontegg/react-core';
import classNames from 'classnames';

export type ApiTokensHeaderProps = PageHeaderProps;

export const ApiTokensHeader: FC<ApiTokensHeaderProps> = (props) => {
  const { t } = useT();
  const customProps: Partial<PageHeaderProps> = {
    className: classNames('fe-apiTokens__header', props.className),
    title: props.title ?? t('auth.apiTokens.title'),
    subTitle: props.subTitle ?? t('auth.apiTokens.subtitle'),
  };

  return <PageHeader {...props} {...customProps} />;
};
