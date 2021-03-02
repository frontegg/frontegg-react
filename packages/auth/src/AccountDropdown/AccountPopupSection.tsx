import React, { FC, ReactElement, MouseEvent } from 'react';
import { MenuItem } from '@frontegg/react-core';

export type AccountPopupSectionProps = {
  title?: string;
  dataTestId?: string;
  items: {
    icon: ReactElement;
    title: string;
    onClick: (e: MouseEvent<HTMLElement>) => void;
  }[];
};

export const AccountPopupSection: FC<AccountPopupSectionProps> = (props) => {
  const { title, items } = props;
  return (
    <div className='fe-account-popup-section' data-test-id={props.dataTestId}>
      {title && <div className='fe-account-popup-section__title'>{title}</div>}
      {items.map((item, index) => (
        <MenuItem key={index} withIcons={true} icon={item.icon} onClick={item.onClick} text={<>{item.title}</>} />
      ))}
    </div>
  );
};
