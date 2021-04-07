import { createAction } from '@reduxjs/toolkit';

export function omitProps<T>(props: any, keys: string[]): T {
  const newProps = { ...props };
  keys.forEach((key) => {
    delete newProps[key];
  });
  return newProps as T;
}

export function generateActionCreator(storeName: string) {
  return <Payload>(key: string, withPayload?: boolean) =>
    withPayload
      ? createAction(`${storeName}/${key}`, (payload: Payload) => ({ payload }))
      : createAction(`${storeName}/${key}`);
}

export const readFileAsText = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });
