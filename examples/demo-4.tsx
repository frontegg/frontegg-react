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
// import { AuthProvider } from '@frontegg-react/auth';
// import { AuditsProvider } from '@frontegg-react/audits';
// import { ReportsProvider } from '@frontegg-react/reports';
// import { TeamsProvider } from '@frontegg-react/teams';
//
// // Render Plugins Providers as children of FronteggProvider
// //
// // PROS
// // - easy to use
// // - can use hooks foreach plugins (useAuth, useReports, userAudits, ...)
// // - Simple and focused redux state management per plugin
// // CONS
// // - bad practice
// // - the will make a huge virtual-dom in react, nested provider
// // - some plugin provider cannot use other plugin provider if it's in his children
//
// const contextOptions = {};
// ReactDOM.render(
//   <FronteggProvider contextOptions={contextOptions}>
//     <AuthProvider>
//       <AuditsProvider>
//         <ReportsProvider>
//           <TeamsProvider>
//
//             <App/>
//
//           </TeamsProvider>
//         </ReportsProvider>
//       </AuditsProvider>
//     </AuthProvider>
//   </FronteggProvider>,
//   document.querySelector('#root'),
// );
