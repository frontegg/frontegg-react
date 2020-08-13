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
// // foreach plugin option passing in pluginsOptions prop the FronteggProvider
// // will initialize his state and connect it to the state reducer
// //
// // PROS
// // - easy to use
// // - small virtual-dom tree
// // - can use any other provider between plugins
// // - can use hooks foreach plugins (useAuth, useReports, userAudits, ...)
// // CONS
// // - the bundle should be large if the vendor using only one plugin
// // - Complex and wide redux state management for all plugins
//
//
// const contextOptions = {};
// const pluginsOptions = {
//   'auth': {      /* auth options    */ },
//   'audits': {    /* audits options  */ },
//   'reports': {   /* reports options */ },
//   'teams': {     /* teams options   */ },
// };
// ReactDOM.render(
//   <FronteggProvider contextOptions={contextOptions} pluginsOptions={pluginsOptions}>
//     <App/>
//   </FronteggProvider>,
//   document.querySelector('#root'),
// );
