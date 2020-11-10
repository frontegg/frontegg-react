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

const getImageDimension = (file: File) =>
  new Promise<{ width: number; height: number }>((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      const result = { width: img.width, height: img.height };
      URL.revokeObjectURL(objectUrl);
      resolve(result);
    };
    img.onerror = () => {
      const result = { width: 0, height: 0 };
      URL.revokeObjectURL(objectUrl);
      resolve(result);
    };

    img.src = objectUrl;
  });

export const FileInput = (props: InputProps) => React.createElement(ElementsFactory.getElement('Input'), props);
export const FFileInput: FC<InputProps & { name: string }> = (props) => {
  const { t } = useT();
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
          const { width, height } = await getImageDimension(selectedFile);
          if (width < 256 || height < 256) {
            setFieldError(field.name, t('auth.profile.info.invalid-profile-photo'));
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
