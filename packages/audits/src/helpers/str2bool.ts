export const str2bool = (str?: string) => {
  const value = str?.toLowerCase?.();
  if (!value) {
    return false;
  }
  switch (value) {
    case 'yes':
    case 'always':
      return true;
    default:
      return false;
  }
};
