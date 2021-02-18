import UAParser from 'ua-parser-js';
import classNames from 'classnames';
import React, { useMemo } from 'react';
import { CellComponent, Popup, TableCells } from '@frontegg/react-core';

import { AuditsTableJson } from './AuditsTableJson';
import { AuditsTableIpCell } from './AuditsTableIpCell';
import { browsers, prefixCls, sizeOfIcon } from './constants';
import { browserIcons, TBrowserIcons } from './BrowserIcons';

const AuditsTag: CellComponent = (props) => {
  return (
    <div
      className={classNames('fe-audits__severity', {
        [`${prefixCls}__severity-${props.value?.toLowerCase?.()}`]: props.value,
      })}
    >
      <span className='fe-audits__severity-dot' />
      {props.value}
    </div>
  );
};

// Logos take from the cdnjs site. The repository with the src is here https://github.com/alrra/browser-logos
const ownRegexp = [
  [/^(axios).*\/([\d\.]+)/i],
  [[UAParser.BROWSER.NAME, 'Axios'], UAParser.BROWSER.VERSION],
  [/^(postman).*\/([\d\.]+)/i],
  [[UAParser.BROWSER.NAME, 'Postman'], UAParser.BROWSER.VERSION],
  [/^(python-requests).*\/([\d\.]+)/i],
  [[UAParser.BROWSER.NAME, 'Python'], UAParser.BROWSER.VERSION],
];
const Parser = new UAParser(undefined, { browser: ownRegexp });

const UserAgent: CellComponent = ({ value }: { value: string }) => {
  const browser = useMemo(() => {
    const browser = Parser.setUA(value).getBrowser().name;
    return browser && browsers.includes(browser?.toLowerCase() ?? '') ? browser : 'Web';
  }, [value]);

  const triggerElement = useMemo(() => {
    const br = browser.toLowerCase();
    if (browserIcons[br as TBrowserIcons]) {
      return React.createElement(browserIcons[br as TBrowserIcons], { width: sizeOfIcon, height: sizeOfIcon });
    }

    const imgSrc = `//cdnjs.cloudflare.com/ajax/libs/browser-logos/69.0.4/${br}/${br}_${sizeOfIcon}x${sizeOfIcon}.png`;
    return React.createElement('img', { alt: browser, src: imgSrc });
  }, [browser]);

  if (!value) {
    return null;
  }

  return (
    <div className={classNames('fe-audits__severity')}>
      <Popup
        action='hover'
        content={<div className={`${prefixCls}__useragent-hover`}>{value}</div>}
        trigger={triggerElement}
      />
    </div>
  );
};

export const getAuditsTableCells = (column: string): CellComponent => {
  switch (column) {
    case 'user':
      return TableCells.Title;
    case 'createdAt':
      return TableCells.DateAgo;
    case 'severity':
      return AuditsTag;
    case 'ip':
      return AuditsTableIpCell;
    case 'json':
      return AuditsTableJson;
    case 'userAgent':
      return UserAgent;
    default:
      return TableCells.Description;
  }
};
