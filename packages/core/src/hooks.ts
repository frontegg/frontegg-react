import { useEffect, useRef, useState } from 'react';
import * as FFormik from 'formik';
import { useTranslation, UseTranslationResponse } from 'react-i18next';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

export { useSelector, useDispatch, shallowEqual };
export { FFormik };
export const useT = (): UseTranslationResponse => useTranslation();

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
