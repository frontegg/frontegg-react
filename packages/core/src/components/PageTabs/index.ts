import { Children, ReactNode } from 'react';
import * as ReactIs from 'react-is';
import { PageTabProps } from './PageTabs';

export * from './PageTabs';

const joinPaths = (root: string, path: string) => {
  const p1 = root.endsWith('/') ? root.substring(0, root.length - 1) : root;
  const p2 = path.startsWith('/') ? path.substring(1) : path;
  return `${p1}/${p2}`;
};

export const buildTabsFromChildren = (rootPath: string, children?: ReactNode): [PageTabProps[], string[]] => {
  const invalidTabs: string[] = [];
  let components: any = children;
  if (!children) {
    return [[], invalidTabs];
  }
  if (ReactIs.isFragment(children)) {
    components = components.props.children;
    return buildTabsFromChildren(rootPath, components);
  }
  const tabs: PageTabProps[] = [];

  Children.forEach(components, (child: any, i) => {
    if (typeof child !== 'object') {
      return null;
    }
    if (!child.type.Title || !child.type.route) {
      invalidTabs.push(`${i}`);
    }
    tabs.push({
      Title: child.type.Title ?? (() => `Tab ${tabs.length + 1}`),
      route: joinPaths(rootPath, child.type.route ?? (i === 0 ? rootPath : `/tab-${tabs.length + 1}`)),
      comp: child,
    });
  });
  return [tabs, invalidTabs];
};
