import { Button, FButton, FForm, FFormik, Grid, Loader, useDispatch, useSelector, useT } from '@frontegg/react-core';
import React, { FC, useEffect } from 'react';
import { integrationsActions } from '../../reducer';
import { IPluginState, TForms, TFormsData } from '../../types';

export interface IIntegrationsForm {
  type: TForms;
  onClose(): void;
  validationSchema: any;
  initialValues: TFormsData;
}

const { Formik, isFunction } = FFormik;

export const IntegrationsForm: FC<IIntegrationsForm> = ({
  children,
  validationSchema,
  initialValues,
  type,
  onClose,
}) => {
  const dispatch = useDispatch();
  const { t } = useT();

  const { isLoading, data, savedSuccess } = useSelector(({ integrations: { forms } }: IPluginState) => forms);

  useEffect(() => {
    dispatch(integrationsActions.loadFormAction(type));
    return () => {
      dispatch(integrationsActions.cleanFormsData());
    };
  }, [type]);

  useEffect(() => {
    savedSuccess && onClose();
  }, [savedSuccess]);

  return (
    <div>
      {isLoading ? (
        <Loader center />
      ) : (
        <Formik
          initialValues={{ ...initialValues, ...data }}
          validationSchema={validationSchema}
          onSubmit={(value) => {
            dispatch(integrationsActions.postFormAction(type, value));
          }}
        >
          {(props) => (
            <FForm>
              <Grid container alignItems='center' spacing={1}>
                {isFunction(children) ? children(props) : children}
                <Grid
                  xs={12}
                  container
                  item
                  spacing={1}
                  justifyContent='flex-end'
                  className='fe-integrations-forms-actions'
                >
                  <Button type='reset' onClick={onClose}>
                    {t('common.close')}
                  </Button>
                  <FButton type='submit'>{t('common.save')}</FButton>
                </Grid>
              </Grid>
            </FForm>
          )}
        </Formik>
      )}
    </div>
  );
};
