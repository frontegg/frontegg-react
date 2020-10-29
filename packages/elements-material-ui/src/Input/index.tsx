import React, { FC, useCallback, useState } from 'react';
import { InputProps } from '@frontegg/react-core';
import {
  InputProps as MaterialInputProps,
  TextField as MaterialTextField,
  TextFieldProps as MaterialTextFieldProps,
  IconButton,
  InputAdornment,
  InputAdornmentProps,
  makeStyles,
} from '@material-ui/core';
import { Search, Visibility, VisibilityOff } from '@material-ui/icons';
import { Button } from '../Button';
import classNames from 'classnames';

const useStyles = makeStyles({
  inForm: {
    margin: '0.5rem 0 1rem',
  },
});

const useFooterStyles = makeStyles({
  footer: {
    display: 'flex',
  },
  labelButton: {
    marginLeft: 'auto',
  },
});

const appendAdornment = (
  props: Partial<MaterialTextFieldProps> | undefined,
  at: keyof MaterialInputProps,
  iconAction: InputProps['iconAction'],
  icon: InputProps['prefixIcon'] | InputProps['suffixIcon']
) => {
  const position: InputAdornmentProps['position'] = at === 'startAdornment' ? 'start' : 'end';

  return {
    ...props,
    InputProps: {
      [at]: (
        <InputAdornment onClick={iconAction} position={position}>
          {iconAction ? <IconButton>{icon}</IconButton> : icon}
        </InputAdornment>
      ),
    },
  };
};

const useInputTypeIcon = ({
  type,
  onSearch,
  value,
}: {
  type: InputProps['type'];
  onSearch: InputProps['onSearch'];
  value: InputProps['value'];
}): [boolean, JSX.Element] => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = useCallback(() => setShowPassword((_) => !_), []);

  const Icon = type === 'password' ? (showPassword ? Visibility : VisibilityOff) : Search;
  const onClick = type === 'password' ? toggleShowPassword : () => onSearch?.(value);

  return [
    showPassword,
    Icon && (
      <IconButton onClick={onClick}>
        <Icon />
      </IconButton>
    ),
  ];
};

const materialTextFieldMapper = (props: InputProps): MaterialTextFieldProps => {
  const {
    className,
    inForm,
    fullWidth,
    error,
    iconAction,
    multiline,
    variant,
    labelButton,
    onSearch,
    size,
    type,
    ...restPropsWithIcons
  } = props;

  let { prefixIcon, suffixIcon, ...pureProps } = restPropsWithIcons;

  const [showPassword, InputTypeIcon] = useInputTypeIcon({ type, onSearch, value: props.value });

  const styles = useStyles();
  const footerStyles = useFooterStyles();

  let mappedProps = {
    ...pureProps,
    className: classNames(className, { [styles.inForm]: inForm }),
    fullWidth,
    rows: 4,
    type: type === 'password' && showPassword ? 'text' : type,
    multiline,
    size: size ? (size === 'large' ? 'medium' : size) : 'small',
    variant: 'outlined',
    color: variant === 'primary' || variant === 'secondary' ? variant : undefined,
    disabled: props.disabled || variant === 'disabled',
    error: !!error,
    FormHelperTextProps: {
      component: 'div',
    },
    helperText: (
      <div className={footerStyles.footer}>
        {error}
        {labelButton && (
          <Button
            size='small'
            asLink
            className={classNames(labelButton.className, footerStyles.labelButton)}
            {...labelButton}
          />
        )}
      </div>
    ),
  } as MaterialTextFieldProps;

  if (type === 'password' || type === 'search') {
    suffixIcon = (
      <>
        {InputTypeIcon}
        {suffixIcon}
      </>
    );
  }

  if (prefixIcon) {
    mappedProps = appendAdornment(mappedProps, 'startAdornment', iconAction, prefixIcon);
  } else if (suffixIcon) {
    mappedProps = appendAdornment(mappedProps, 'endAdornment', iconAction, suffixIcon);
  }

  return mappedProps;
};

export const Input: FC<InputProps> = (props) => {
  return <MaterialTextField {...materialTextFieldMapper(props)} />;
};
