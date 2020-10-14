import { useTranslation, UseTranslationResponse } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import * as FFormik from 'formik';
import { useEffect, useState } from 'react';

export { useSelector, useDispatch };
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
