import { ComponentType } from 'react';
import { bindActionCreators, Dispatch } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import { withTranslation, WithTranslation } from 'react-i18next';

export {
  withTranslation as withT,
  WithTranslation as WithT,
};

export function memoEqual(prevProps: any, nextProps: any) {
  return Object.keys(nextProps).reduce((p: boolean, next: any) => {
    if (typeof prevProps[next] == 'function' && typeof nextProps[next] == 'function') {
      return p;
    }
    if (prevProps[next] != nextProps[next]) {
      return p && false;
    } else {
      return p;
    }
  }, true);
}

export type UseMapper<S, A> = {
  state: (state: S) => Partial<S>
  actions: (actions: A) => Partial<A>
}

export const withPlugin = <S, A>(pluginName: string, defaultMapper: UseMapper<S, A>, pluginActions: A) => {

  const fn = <P extends any>(Component: ComponentType<P>, mapper: UseMapper<S, A>) => {
    const mapStateToProps = (state: any) => mapper.state(state[pluginName]);
    const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(mapper.actions(pluginActions) as any, dispatch);
    return connect(
      mapStateToProps,
      mapDispatchToProps,
    )(Component as any) as ComponentType<Omit<P, keyof (ReturnType<typeof mapper.state> & ReturnType<typeof mapper.actions>)>>;
  };
  Object.defineProperty(fn, 'name', { value: `with${pluginName.substring(0, 1).toUpperCase()}${pluginName.substring(1)}` });
  return fn;
};
