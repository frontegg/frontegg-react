import { useTranslation, UseTranslationResponse } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import * as FFormik from 'formik';
import { useEffect, useRef, useState } from 'react';

export { useSelector, useDispatch };
export { FFormik };
export const useT = (): UseTranslationResponse => useTranslation();
export * from './helpers/useSearch';

export function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);
  return debouncedValue;
}

export function usePrevious<T>(value: T) {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current as T;
}
