import React, { ComponentType } from 'react';
import { WithT, withT, RendererFunction, omitProps, Loader } from '@frontegg/react-core';
import { AuthActions, AuthState } from '../Api';
import { withAuth } from '../HOCs';

const stateMapper = ({ routes, onRedirectTo }: AuthState) => ({ routes, onRedirectTo });
const actionsMapper = ({ resetActivateState }: AuthActions) => ({ resetActivateState });

export interface ActivateAccountSuccessRedirectProps {
  renderer?: RendererFunction<Props, ActivateAccountSuccessRedirectProps>
}

type Props = ReturnType<typeof stateMapper> & ReturnType<typeof actionsMapper> & WithT & ActivateAccountSuccessRedirectProps

class ActivateAccountSuccessRedirectComponent extends React.Component<Props> {

  componentDidMount() {
    const { routes: { loginUrl }, onRedirectTo, resetActivateState } = this.props;
    setTimeout(() => {
      resetActivateState();
      onRedirectTo(loginUrl);
    }, 1000);
  }

  render() {
    const { renderer, t } = this.props;

    if (renderer) {
      return renderer(omitProps(this.props, ['renderer', 'components']));
    }

    return <>
      <div className='fe-center fe-success-message'>
        {t('auth.activate-account.activation-succeeded')}
      </div>
      <Loader center/>
    </>;
  }
}

export const ActivateAccountSuccessRedirect = withAuth(
  withT()(ActivateAccountSuccessRedirectComponent),
  stateMapper,
  actionsMapper,
) as ComponentType<ActivateAccountSuccessRedirectProps>;
