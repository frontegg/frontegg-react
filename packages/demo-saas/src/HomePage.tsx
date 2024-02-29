import React, { FC } from 'react';
import { wrapWithBaseHomePage } from './BaseHomePage/BaseHomePage';

const HomePage: FC = () => {
  return <>Home Page</>;
};

export default wrapWithBaseHomePage(HomePage);
