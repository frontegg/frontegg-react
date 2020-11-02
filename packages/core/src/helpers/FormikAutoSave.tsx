import { FC, useEffect } from 'react';
import { FFormik, useDebounce } from '../hooks';

export interface IFormikAutoSave {
  debounceMs?: number;
}

export const FormikAutoSave: FC<IFormikAutoSave> = ({ debounceMs = 500 }) => {
  const { values, submitForm, initialValues, setSubmitting } = FFormik.useFormikContext();

  const saveData = useDebounce(values, debounceMs);

  useEffect(() => {
    if (JSON.stringify(initialValues) !== JSON.stringify(saveData)) {
      submitForm();
      setSubmitting(false);
    }
  }, [saveData, submitForm, initialValues, setSubmitting]);
  return null;
};
