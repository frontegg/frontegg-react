import { PayloadAction } from '@reduxjs/toolkit';
import { ContextOptions } from './interfaces';
export interface RootState {
    context?: ContextOptions;
}
declare const initialState: RootState;
declare const reducer: import("redux").Reducer<RootState, import("redux").AnyAction>, actions: import("@reduxjs/toolkit").CaseReducerActions<{
    setContext: {
        prepare: (context: ContextOptions) => {
            payload: ContextOptions;
        };
        reducer: (state: RootState, { payload }: PayloadAction<ContextOptions>) => {
            context: ContextOptions;
        };
    };
}>;
export { reducer as rootReducer, actions as rootActions, initialState as rootInitialState, };
