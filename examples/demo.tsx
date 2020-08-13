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
// import { AuthPlugin } from '@frontegg-react/auth';
// import { AuditsPlugin } from '@frontegg-react/audits';
// import { ReportsPlugin } from '@frontegg-react/reports';
// import { TeamsPlugin } from '@frontegg-react/teams';
//
// // foreach plugin passed in plugins prop the FronteggProvider
// // will initialize his state and connect it to the state reducer
// //
// // PROS
// // - easy to use
// // - small virtual-dom tree
// // - can use any other provider between plugins
// // - small bundle because you are only registered the specified plugins
// // - can use hooks foreach plugins (useAuth, useReports, userAudits, ...)
// // - Simple and focused redux state management per plugin
// // CONS
// // - hard syntax
// //
//
// const contextOptions = {};
// const plugins = [
//   AuthPlugin({    /* auth options    */  }),
//   AuditsPlugin({  /* audits options  */  }),
//   ReportsPlugin({ /* reports options */  }),
//   TeamsPlugin({   /* teams options   */  }),
// ];
// ReactDOM.render(
//   <FronteggProvider contextOptions={contextOptions} plugins={plugins}>
//     <App/>
//   </FronteggProvider>,
//   document.querySelector('#root'),
// );
//
