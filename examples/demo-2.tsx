// import React from 'react';
// import ReactDOM from 'react-dom';
//
// const App: any = () => null;
// const FronteggProvider: any = ({}: any) => null;
// const AuditsPlugin: any = ({}: any) => null;
// const AuthPlugin: any = ({}: any) => null;
// const InAppReportPlugin: any = ({}: any) => null;
// const TeamManagementPlugin: any = ({}: any) => null;
//
// // index.tsx
// import { FronteggProvider } from '@frontegg-react/core';
//
// // all plugin will be initialized and constructed
// // in single state reducer with connectors
// //
// // PROS
// // - easy to use
// // - small virtual-dom tree
// // - can use any other provider between plugins
// // CONS
// // - the bundle should be large if the vendor using only one plugin
// // - CANNOT use hooks foreach plugins (useAuth, useReports, userAudits, ...)
// // - Complex and wide redux state management for all plugins
//
// const contextOptions = {};
// ReactDOM.render(
//   <FronteggProvider contextOptions={contextOptions}>
//     <App/>
//   </FronteggProvider>,
//   document.querySelector('#root'),
// );
