import React, { ChangeEvent, FC, InputHTMLAttributes, TextareaHTMLAttributes, useCallback, useState } from 'react';
import { InputProps } from './interfaces';
import { ClassNameGenerator } from '../../styles';
import { FeIcon } from '../Icon/FeIcon';
import classNames from 'classnames';
import { FeButton } from '../Button/FeButton';
import './FeInput.scss';

const prefixCls = 'fe-input';
export const FeInput: FC<InputProps> = (props) => {
  const {
    className,
    onSearch: propsOnSearch,
    variant,
    type: propsType = 'text',
    size,
    label,
    prefixIcon,
    suffixIcon,
    error,
    multiline,
    labelButton,
    fullWidth,
    inForm,
    ...restProps
  } = props;
  const { iconAction, ...propsWithoutJunk } = restProps;

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = useCallback(() => setShowPassword((_) => !_), []);

  const [text, setText] = useState(props.value);
  const changeText = useCallback((e: ChangeEvent<HTMLInputElement>) => setText(e.target.value), []);

  const onSearch = useCallback(() => propsOnSearch?.(text as string), [text]);

  const classes = ClassNameGenerator.generate(
    {
      prefixCls,
      className,
      isFullWidth: fullWidth,
    },
    inForm && 'in-form'
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
  const type = propsType === 'password' && showPassword ? 'text' : propsType;

  return (
    <div className={classes}>
      {(label || labelButton) && (
        <div className={`${prefixCls}__header`}>
          {label && <div className={`${prefixCls}__label`}>{label}</div>}

          {labelButton && (
            <FeButton className={classNames(`${prefixCls}__label-button`, labelButton.className)} {...labelButton} />
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
            value: props.value || text,
            onChange: props.onChange || changeText,
            type,
          }
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
};
