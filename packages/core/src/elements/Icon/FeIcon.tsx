import React, { FC, forwardRef } from 'react';
import { IconNames, IconProps } from './interfaces';
import { omitProps } from '../../helpers';
import { SortArrows, SortArrowsAsc, SortArrowsDesc } from './svgs/SortArrows';
import { Visibility, VisibilityOff } from './svgs/Visibility';
import { Filters } from './svgs/Filters';
import { UpArrow, DownArrow, RightArrow, LeftArrow } from './svgs/Arrows';
import { Checkmark, Indeterminate } from './svgs/Checkmark';
import { Delete, Edit, Search, Send } from './svgs/Actions';
import { PersonAdd } from './svgs/PersonAdd';
import { VerticalDots } from './svgs/VerticalDots';

const mapIcons: Partial<{ [key in IconNames]: FC }> = {
  'down-arrow': DownArrow,
  'left-arrow': LeftArrow,
  'person-add': PersonAdd,
  'right-arrow': RightArrow,
  'sort-arrows-asc': SortArrowsAsc,
  'sort-arrows-desc': SortArrowsDesc,
  'sort-arrows': SortArrows,
  'up-arrow': UpArrow,
  'vertical-dots': VerticalDots,
  'visibility-off': VisibilityOff,
  back: LeftArrow,
  checkmark: Checkmark,
  delete: Delete,
  edit: Edit,
  filters: Filters,
  indeterminate: Indeterminate,
  search: Search,
  send: Send,
  visibility: Visibility,
};

export const FeIcon = forwardRef<HTMLElement, IconProps>((props, ref) => {
  const SelectedIcon: any = mapIcons[props.name] ?? (() => null);
  if (!SelectedIcon) {
    return null;
  }
  return <SelectedIcon ref={ref} {...omitProps(props, ['name'])} />;
});
