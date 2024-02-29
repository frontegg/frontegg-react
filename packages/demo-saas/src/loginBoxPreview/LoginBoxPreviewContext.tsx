import { createContext } from 'react';
import { LoginBoxRenderer } from '@frontegg/js';

export interface BuilderContextData {
  renderer: LoginBoxRenderer | null;
  setRenderer: (renderer: LoginBoxRenderer | null) => void;
}

const LoginBoxPreviewContext = createContext<BuilderContextData>({
  renderer: null,
  setRenderer: () => ({}),
});

export default LoginBoxPreviewContext;
