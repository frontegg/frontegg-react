import { useTranslation, UseTranslationResponse } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';


export { useSelector, useDispatch };
export const useT = (): UseTranslationResponse => useTranslation();
