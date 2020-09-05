import React, { FC, useEffect, useRef } from 'react';
import { AuthActions, AuthState } from './Api';
import { useAuth } from './hooks';

const stateMapper = ({ isAuthenticated, user }: AuthState) => ({ isAuthenticated, user });
const actionsMapper = ({ requestAuthorize }: AuthActions) => ({ requestAuthorize });
//
// class Listener extends React.Component<ReturnType<typeof stateMapper> & ReturnType<typeof actionsMapper>> {
//   private timer?: any;
//   private isAuthenticated: boolean | null = null;
//
//   constructor(props: any) {
//     super(props);
//     this.updateSessionTimer(true);
//   }
//
//   updateSessionTimer = (firstTime: boolean = false) => {
//     const { isAuthenticated, user } = this.props;
//     if (!isAuthenticated && !firstTime) {
//       if (this.timer) {
//         clearTimeout(this.timer);
//       }
//     } else if (this.isAuthenticated !== isAuthenticated || firstTime) {
//       this.isAuthenticated = isAuthenticated;
//       this.requestAuthorize((user?.expiresIn || 20) * 1000, firstTime);
//     }
//   };
//   requestAuthorize = (expired: number, firstTime: boolean = false) => {
//     if (this.props.isAuthenticated || firstTime) {
//       this.props.requestAuthorize(firstTime);
//       this.timer = setTimeout(() => this.updateSessionTimer(), expired * 0.8);
//     }
//   };
//
//   render() {
//     return null;
//   }
// }
//
// export default withAuth(Listener, stateMapper, actionsMapper);
//

export const AuthListener: FC = () => {
  const timer = useRef<number>(0);
  const { isAuthenticated, user, requestAuthorize } = useAuth(stateMapper, actionsMapper);

  const updateSessionTimer = (firstTime: boolean = false) => {
    timer.current && clearInterval(timer.current);
    if (firstTime) {
      requestAuthorize(firstTime);
    } else {
      timer.current && clearInterval(timer.current);
      if (isAuthenticated) {
        const ttl = (user?.expiresIn || 20) * 1000 * 0.8;
        timer.current = setTimeout(() => requestAuthorize(), ttl);
      }
    }
  };
  useEffect(() => updateSessionTimer(true), []);
  useEffect(() => updateSessionTimer(), [isAuthenticated, user]);
  return null;
};
