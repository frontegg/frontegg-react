import { Theme } from '../../styles';

export interface LoaderProps extends React.HTMLAttributes<HTMLElement> {
  inline?: boolean; // inline -> display: inline-block => text-align -> beofre text in
  center?: boolean; //
  variant?: Theme;
}
