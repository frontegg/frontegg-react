import { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

interface useQueryKeeperProps {
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

export const useQueryKeeper = ({ routes }: useQueryKeeperProps): void => {
  const queryParams = useRef<string>();
  const prevPathname = useRef<string>();

  const history = useHistory();

  useEffect(() => {
    if (!!history.location.search) {
      queryParams.current = history.location.search;
      prevPathname.current = history.location.pathname;
    }
  }, []);

  history.listen((listener) => {
    if (listener.search) {
      queryParams.current = listener.search;
    }

    const shouldKeepQuery = !!Object.values(routes).find((route) => route === prevPathname.current);

    if (!listener.search && !!queryParams.current && shouldKeepQuery) {
      const query = removeRedirectUrlFromQuery(queryParams.current);
      history.push(listener.pathname + `?${query}`);
      queryParams.current = '';
      prevPathname.current = '';
    }

    prevPathname.current = listener.pathname;
  });
};
