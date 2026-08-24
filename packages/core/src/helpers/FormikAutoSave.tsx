import { FC, useEffect } from 'react';
import { FFormik, useDebounce } from '../hooks';

export interface IFormikAutoSave {
  debounceMs?: number;
  isSaving: boolean;
}

export const FormikAutoSave: FC<IFormikAutoSave> = ({ debounceMs = 500, isSaving }) => {
  const { values, submitForm, initialValues, setSubmitting, isValid } = FFormik.useFormikContext();

  const saveData = useDebounce(values, debounceMs);

  useEffect((): (() => void) => {
    return () => {
      submitForm();
    };
  }, []);

  useEffect(() => {
    isValid && JSON.stringify(initialValues) !== JSON.stringify(saveData) && submitForm();
  }, [saveData, submitForm, isValid, initialValues]);

  useEffect(() => {
    !isSaving && setSubmitting(false);
  }, [isSaving]);

  return null;
};
