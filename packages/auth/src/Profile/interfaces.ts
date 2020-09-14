import { FC } from 'react';
import { PageTabProps } from '@frontegg/react-core';

export type ProfilePage<T = {}> = FC<T> & Omit<PageTabProps, 'comp'>;
