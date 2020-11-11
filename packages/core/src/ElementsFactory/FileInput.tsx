import React, { FC } from 'react';
import { InputProps } from '../elements/Input';
import { ElementsFactory } from './ElementsFactory';
import { useField, useFormikContext } from 'formik';
import { useT } from '../hooks';

const toBase64 = (file?: File) =>
  new Promise<string>((resolve, reject) => {
    if (file == null) {
      resolve('');
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result?.toString() ?? '');
    reader.onerror = (error) => reject(error);
  });

export const FileInput = (props: InputProps) => React.createElement(ElementsFactory.getElement('Input'), props);
export const FFileInput: FC<InputProps & { name: string }> = ({ validation, ...props }) => {
  const [field] = useField(props.name);
  const { setFieldError } = useFormikContext();

  return (
    <FileInput
      {...props}
      type='file'
      style={{ display: 'none', ...props.style }}
      onChange={async (e) => {
        e.persist();
        const selectedFile = e.target.files?.[0];

        if (selectedFile) {
          const errorMessage = (await validation?.(selectedFile)) ?? null;
          if (errorMessage) {
            setFieldError(field.name, errorMessage);
            return;
          }

          const content = await toBase64(selectedFile);
          field.onChange(field.name)(content);
        } else {
          field.onChange(field.name)('');
        }
      }}
    />
  );
};
