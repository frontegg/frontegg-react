import classNames from 'classnames';
import { Size, Theme } from './Styles';

export interface ClassNameGeneratorOptions {
  prefixCls: string;
  className?: string;
  isClickable?: boolean;
  theme?: Theme;
  size?: Size;
  isFullWidth?: boolean;
  isLoading?: boolean;
}

export class ClassNameGenerator {
  public static generate = (
    {
      prefixCls,
      className,
      theme,
      size,
      isClickable = false,
      isFullWidth = false,
      isLoading = false,
    }: ClassNameGeneratorOptions,
    ...extraClasses: (string | boolean | null | undefined)[]
  ) => {
    return classNames(prefixCls, className, {
      [`${prefixCls}-${theme}`]: theme,
      [`${prefixCls}-${size}`]: size,
      [`${prefixCls}-clickable`]: isClickable,
      [`${prefixCls}-full-width`]: isFullWidth,
      [`${prefixCls}-loader`]: isLoading,
      ...extraClasses
        .filter((_) => !!_)
        .map((className) => `${prefixCls}-${className}`)
        .reduce((acc, curr) => ({ ...acc, [curr]: true }), {}),
    });
  };
}
