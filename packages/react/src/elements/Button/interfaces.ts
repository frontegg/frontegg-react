import React from 'react';

export interface IButtonProps {
  fullWidth?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';

  // common
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  disabled?: boolean;
  loading?: boolean;
}
