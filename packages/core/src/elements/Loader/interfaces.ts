export interface LoaderProps extends React.HTMLAttributes<HTMLElement> {
  inline?: boolean;
  center?: boolean;
  variant?: 'primary' | 'secondary' | 'inherit';
}
