import { createSelector } from 'reselect';
import { OldAuditsState as AuditsState } from '@frontegg/redux-store';

const filters = (state: AuditsState) => state.filters;
const headerProps = (state: AuditsState) => state.headerProps;
const predefinedFilters = (state: AuditsState) => state.predefinedFilters;

export const filtersWithoutPredefined = createSelector(predefinedFilters, filters, (predefinedFilters, filters) =>
  filters.filter((f: any) => !Object.keys(predefinedFilters).includes(f.key))
);

export const headerPropsWithoutPredefinedFilters = createSelector(
  headerProps,
  predefinedFilters,
  (headerProps, predefinedFilters) => headerProps.filter((i: any) => !Object.keys(predefinedFilters).includes(i.name))
);
