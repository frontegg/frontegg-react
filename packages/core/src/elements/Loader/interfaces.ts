import { Theme } from '../../styles';

export interface LoaderProps extends React.HTMLAttributes<HTMLElement> {
  inline?: boolean;
  center?: boolean;
  variant?: Theme;
}
