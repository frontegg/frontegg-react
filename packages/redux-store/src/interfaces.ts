export type WithCallback<T = {}, R = boolean> = T & {
  callback?: (data: R | null, error?: string) => void;
};
export type WithStatus<T = {}> = {
  loading: boolean;
  error?: any;
  saving?: boolean;
  policy?: T;
};

export type LoaderIndicatorState<T extends string> = Partial<
  {
    [key in T]: string | boolean;
  }
>;
export type WithSilentLoad<T> = T & {
  silentLoading?: boolean;
};

export type ActionDispatchMatcher<Reducers, Actions, DispatchedActions> = Omit<
  Reducers & Actions,
  keyof DispatchedActions
> &
  Omit<DispatchedActions, keyof (Actions & Reducers)>;
