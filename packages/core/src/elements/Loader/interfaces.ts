import { Theme } from '../../styles';

export interface LoaderProps extends React.HTMLAttributes<HTMLElement> {
  center?: boolean;
  variant?: Theme;
}
