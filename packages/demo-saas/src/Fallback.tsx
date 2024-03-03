import React from 'react';
import { wrapWithBaseHomePage } from './BaseHomePage/BaseHomePage';

export const Fallback = () => <>Fallback</>;

export default wrapWithBaseHomePage(Fallback);
