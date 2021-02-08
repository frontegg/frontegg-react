import React, {
  useState,
  forwardRef,
  ChangeEvent,
  useCallback,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react';
import classNames from 'classnames';
import { FeIcon } from '../Icon/FeIcon';
import { InputProps } from './interfaces';
import { FeButton } from '../Button/FeButton';
import { ClassNameGenerator } from '../../styles';
import './FeInput.scss';

const prefixCls = 'fe-input';
export const FeInput = forwardRef<HTMLInputElement, InputProps>((props, forwardRef) => {
  const {
    size,
    label,
    error,
    inForm,
    variant,
    className,
    multiline,
    fullWidth,
    prefixIcon,
    suffixIcon,
    labelButton,
    onSearch: propsOnSearch,
    type: propsType = 'text',
    ...restProps
  } = props;
  const { iconAction, ...propsWithoutJunk } = restProps;

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = useCallback(() => setShowPassword((_) => !_), []);

  const [text, setText] = useState(props.value);
  const changeText = useCallback((e: ChangeEvent<HTMLInputElement>) => setText(e.target.value), []);

  const onSearch = useCallback(() => propsOnSearch?.(text as string), [text]);

  const withPrefixIcon = !!prefixIcon;
  const withSuffixIcon = propsType === 'password' || propsType === 'search' || !!suffixIcon;

  const classes = ClassNameGenerator.generate(
    {
      prefixCls,
      className,
      isFullWidth: fullWidth,
    },
    inForm && 'in-form',
    withPrefixIcon && `with-prefix-icon`,
    withSuffixIcon && `with-suffix-icon`
  );

  const innerClasses = ClassNameGenerator.generate(
    {
      prefixCls: `${prefixCls}__inner`,
      className,
      size,
      theme: props.disabled ? 'disabled' : variant,
    },
    multiline && 'multi',
    error && 'error'
  );

  const clickableIconClasses = ClassNameGenerator.generate({
    prefixCls: 'fe-icon',
    isClickable: true,
  });

  const element = multiline ? 'textarea' : 'input';
  const type = propsType === 'password' && showPassword ? 'text' : propsType === 'search' ? 'text' : propsType;

  return (
    <div className={classes}>
      {(label || labelButton) && (
        <div className={`${prefixCls}__header`}>
          {label && <div className={`${prefixCls}__label`}>{label}</div>}

          {labelButton && (
            <FeButton
              tabIndex={-1}
              className={classNames(`${prefixCls}__label-button`, labelButton.className)}
              {...labelButton}
            />
          )}
        </div>
      )}

      <div className={innerClasses}>
        {prefixIcon}

        {React.createElement<InputHTMLAttributes<HTMLInputElement> | TextareaHTMLAttributes<HTMLTextAreaElement>>(
          element,
          {
            ...propsWithoutJunk,
            className: `${prefixCls}__input`,
            value: props.hasOwnProperty('value') ? props.value : text,
            onChange: props.onChange || changeText,
            type,
            ref: forwardRef,
          } as any
        )}

        {propsType === 'password' && (
          <FeIcon
            className={clickableIconClasses}
            name={showPassword ? 'visibility' : 'visibility-off'}
            onClick={togglePassword}
          />
        )}

        {propsType === 'search' && <FeIcon className={clickableIconClasses} name='search' onClick={onSearch} />}

        {suffixIcon}
      </div>

      {error && <div className={`${prefixCls}__error`}>{error}</div>}
    </div>
  );
});
