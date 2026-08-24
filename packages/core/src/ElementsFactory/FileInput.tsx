import React, { ChangeEvent, forwardRef, useCallback } from 'react';
import { InputProps } from '../elements/Input';
import { ElementsFactory } from './ElementsFactory';
import { useField } from 'formik';

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

export type FileInputProps = InputProps & {
  validation?: (value: File) => Promise<string | null>;
};

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>((props, forwardRef) =>
  React.createElement(ElementsFactory.getElement('Input'), { ...props, ref: forwardRef } as any)
);
export const FFileInput = forwardRef<HTMLInputElement, FileInputProps & { name: string }>(
  ({ validation, ...props }, forwardRef) => {
    const { onChange } = props;
    const [{ name }, {}, { setValue, setError }] = useField(props.name);

    const handlerOnChange = useCallback(
      async (e: ChangeEvent<HTMLInputElement>) => {
        e.persist();
        const selectedFile = e.target.files?.[0];

        if (selectedFile) {
          const errorMessage = (await validation?.(selectedFile)) ?? null;
          if (errorMessage) {
            setError(errorMessage);
            return;
          }

          const content = await toBase64(selectedFile);
          setValue(content);
        } else {
          setValue('');
        }
        onChange && onChange(e);
      },
      [onChange, setValue, setError, name]
    );

    return (
      <span style={{ display: 'none' }}>
        <FileInput {...props} ref={forwardRef} type='file' onChange={handlerOnChange} />
      </span>
    );
  }
);
