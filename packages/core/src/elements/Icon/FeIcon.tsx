import React, { FC } from 'react';
import { IconNames, IconProps } from './interfaces';

import { omitProps } from '../../helpers';
import { SortArrows, SortArrowsAsc, SortArrowsDesc } from './svgs/SortArrows';
import { Filters } from './svgs/Filters';

const mapIcons: Partial<{ [key in IconNames]: FC }> = {
  'sort-arrows': SortArrows,
  'sort-arrows-asc': SortArrowsAsc,
  'sort-arrows-desc': SortArrowsDesc,
  filters: Filters,
};

export const FeIcon: FC<IconProps> = (props) => {
  const SelectedIcon = mapIcons[props.name] ?? (() => null);
  return <SelectedIcon {...omitProps(props, ['name'])} />;
};
