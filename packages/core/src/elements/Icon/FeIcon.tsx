import React, { FC, forwardRef } from 'react';
import { IconNames, IconProps } from './interfaces';
import { omitProps } from '../../helpers';
import { SortArrows, SortArrowsAsc, SortArrowsDesc } from './svgs/SortArrows';
import { Visibility, VisibilityOff } from './svgs/Visibility';
import { Filters } from './svgs/Filters';
import { UpArrow, DownArrow, RightArrow, LeftArrow } from './svgs/Arrows';
import { Checkmark, Indeterminate } from './svgs/Checkmark';
import { Delete } from './svgs/Actions';
import { PersonAdd } from './svgs/PersonAdd';

const mapIcons: Partial<{ [key in IconNames]: FC }> = {
  'up-arrow': UpArrow,
  'down-arrow': DownArrow,
  'right-arrow': RightArrow,
  'left-arrow': LeftArrow,
  'sort-arrows': SortArrows,
  'sort-arrows-asc': SortArrowsAsc,
  'sort-arrows-desc': SortArrowsDesc,
  visibility: Visibility,
  'visibility-off': VisibilityOff,
  delete: Delete,
  checkmark: Checkmark,
  indeterminate: Indeterminate,
  filters: Filters,
  'person-add': PersonAdd,
};

export const FeIcon = forwardRef<HTMLElement, IconProps>((props, ref) => {
  const SelectedIcon: any = mapIcons[props.name] ?? (() => null);
  if (!SelectedIcon) {
    return null;
  }
  return <SelectedIcon ref={ref} {...omitProps(props, ['name'])} />;
});
