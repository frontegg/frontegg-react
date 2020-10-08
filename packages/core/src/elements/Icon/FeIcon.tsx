import React, { FC } from 'react';
import { IconNames, IconProps } from './interfaces';

import { omitProps } from '../../helpers';
import { SortArrows, SortArrowsAsc, SortArrowsDesc } from './svgs/SortArrows';
import { Filters } from './svgs/Filters';
import { UpArrow, DownArrow, RightArrow, LeftArrow } from './svgs/Arrows';

const mapIcons: Partial<{ [key in IconNames]: FC }> = {
  'up-arrow': UpArrow,
  'down-arrow': DownArrow,
  'right-arrow': RightArrow,
  'left-arrow': LeftArrow,
  'sort-arrows': SortArrows,
  'sort-arrows-asc': SortArrowsAsc,
  'sort-arrows-desc': SortArrowsDesc,
  filters: Filters,
};

export const FeIcon: FC<IconProps> = (props) => {
  const SelectedIcon = mapIcons[props.name] ?? (() => null);
  if (!SelectedIcon) {
    return null;
  }
  return <SelectedIcon {...omitProps(props, ['name'])} />;
};
