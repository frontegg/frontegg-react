export const str2bool = (str: string) => {
  switch (str.toLowerCase()) {
    case 'yes':
    case 'always':
      return true;
    default:
      return false;
  }
};
