import React, { ReactNode } from 'react';


export interface AuthPageProps {
  header?: ReactNode;
  backgroundImage?: string;
  backgroundColor?: string;
  loaderComponent?: React.ReactNode;
}


export interface AuthPluginOptions extends AuthPageProps {
}
