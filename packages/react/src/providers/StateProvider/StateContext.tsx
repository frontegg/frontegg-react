import React from 'react';
import { sagaState, sagaActions, allSagaActions, allSagaState } from './saga';
import { CommonApiProps, RequirePartial } from '../CommonApi';
import { CommonApiHOC } from '../CommonApiHOC';

type sagaTypes = ReturnType<typeof allSagaState> & ReturnType<typeof allSagaActions>;
export type IFroneggState = CommonApiProps & RequirePartial<sagaTypes, sagaTypes>

export type IStateMapper = CommonApiProps & ReturnType<typeof sagaState> & ReturnType<typeof sagaActions>;

const { Provider, Consumer } = React.createContext<IStateMapper>({} as IStateMapper);

export { Provider as StateContext, Consumer as StateConsumer };

export const connectFrontegg = CommonApiHOC<IFroneggState, IStateMapper>('StateHOC', Consumer);
