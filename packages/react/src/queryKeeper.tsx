import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { UseHistory } from './routerProxy';

interface useQueryKeeperProps {
  history: UseHistory;
  routes: {
    [key: string]: string;
  };
}

const removeRedirectUrlFromQuery = (query: string) => {
  const q = new URLSearchParams(query);
  q.delete('redirectUrl');
  const cleanedQuery = q.toString();

  return cleanedQuery;
};

export const useQueryKeeper = ({ routes, history }: useQueryKeeperProps): void => {
  const queryParams = useRef<string>();
  const prevPathname = useRef<string>();
  const { pathname, search } = useLocation();

  useEffect(() => {
    if (!!search) {
      queryParams.current = search;
      prevPathname.current = pathname;
    }
  }, []);

  useEffect(() => {
    const shouldKeepQuery = !!Object.values(routes).find((route) => route === prevPathname.current);

    if (!search && !!queryParams.current && shouldKeepQuery) {
      const query = removeRedirectUrlFromQuery(queryParams.current);
      history.push(pathname + `?${query}`);
    }

    prevPathname.current = pathname;
  }, [pathname, search, routes]);
};
