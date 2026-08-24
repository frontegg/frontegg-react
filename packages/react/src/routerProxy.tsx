import * as ReactRouterDom from 'react-router-dom';

export type Path = string;

type Location = {
  pathname: string;
  search: string;
  state: any;
  hash: string;
  key?: string;
};

type LocationDescriptor = string | Location;

export type UseHistory = {
  push(path: Path, state?: any): void;
  push(location: LocationDescriptor): void;
  replace(path: Path, state?: any): void;
  replace(location: LocationDescriptor): void;
};

export const BrowserRouter = ReactRouterDom.BrowserRouter;

export const useHistory = (): UseHistory => {
  // @ts-ignore
  const navigate = ReactRouterDom.useInRouterContext?.() ? ReactRouterDom.useNavigate?.() : null;
  const history = ReactRouterDom.useHistory?.();

  if (navigate) {
    const push = (path: Path, state?: any): void => {
      if (state) {
        navigate(path, { state });
      } else {
        navigate(path);
      }
    };

    const replace = (path: Path, state?: any): void => {
      navigate(path, { state, replace: true });
    };

    return { push, replace };
  }
  return history;
};
