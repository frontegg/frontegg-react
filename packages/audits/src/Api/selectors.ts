import { createSelector } from 'reselect';
import { AuditsState } from './interfaces';

const filters = (state: AuditsState) => state.filters;
const headerProps = (state: AuditsState) => state.headerProps;
const predefinedFilters = (state: AuditsState) => state.predefinedFilters;

export const filtersWithoutPredefined = createSelector(predefinedFilters, filters, (predefinedFilters, filters) =>
  filters.filter((f) => !Object.keys(predefinedFilters).includes(f.key))
);

export const headerPropsWithoutPredefinedFilters = createSelector(
  headerProps,
  predefinedFilters,
  (headerProps, predefinedFilters) => headerProps.filter((i) => !Object.keys(predefinedFilters).includes(i.name))
);
