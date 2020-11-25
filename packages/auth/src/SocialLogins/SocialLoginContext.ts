import { createContext } from 'react';
import { ISocialLoginsContext, SocialLoginsActions } from './types';

export const SocialLoginsContext = createContext<ISocialLoginsContext>({ action: SocialLoginsActions.Login });
