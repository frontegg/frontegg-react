import React, { FC, useCallback } from 'react';
import { ITeamUserRole } from '@frontegg/rest-api';
import { ApiStateKeys, ApiTokensState } from '@frontegg/redux-store/auth';
import {
  Button,
  Dialog,
  ErrorMessage,
  FButton,
  FForm,
  FFormik,
  FInput,
  FSelect,
  Grid,
  useT,
} from '@frontegg/react-core';
import { useApiTokensActions, useApiTokensState } from '../hooks';
import { prefixCls } from '../constants';

const { Formik } = FFormik;

type AddTokenFormValues = {
  description: string;
  roles: { label: string; value: string }[];
};

const stateMapper = ({
  loaders: { ADD_API_TOKEN: loading },
  roles,
  apiTokenType,
  showAddTokenDialog,
  errors: { ADD_API_TOKEN: error },
}: ApiTokensState) => ({
  loading,
  roles,
  apiTokenType,
  showAddTokenDialog,
  error,
});

export const ApiTokensAddDialog: FC = () => {
  const { addUserApiToken, addTenantApiToken, setApiTokensState, setApiTokensError } = useApiTokensActions();
  const { loading, roles, apiTokenType, showAddTokenDialog, error } = useApiTokensState(stateMapper);
  const { t } = useT();

  const initialValues: AddTokenFormValues = {
    description: '',
    roles: [],
  };

  const closeDialog = useCallback(() => {
    setApiTokensState({ showAddTokenDialog: false });
    setApiTokensError({ key: ApiStateKeys.ADD_API_TOKEN, value: false });
  }, [setApiTokensState]);

  return (
    <Dialog
      className={`${prefixCls}__dialog-add`}
      open={showAddTokenDialog}
      size={'tiny'}
      onClose={closeDialog}
      header={t('auth.apiTokens.modal.title')}
    >
      <div className={`${prefixCls}__dialog-description`}>
        {apiTokenType === 'user' ? t('auth.apiTokens.modal.subtitleUser') : t('auth.apiTokens.modal.subtitleTenant')} {}
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={({ description, roles }, { resetForm, setSubmitting }) => {
          setSubmitting(true);
          apiTokenType === 'user'
            ? addUserApiToken({
                description,
                callback: () => {
                  resetForm();
                  setSubmitting(false);
                },
              })
            : addTenantApiToken({
                description,
                roleIds: roles.map((v) => v.value),
                callback: () => {
                  resetForm();
                  setSubmitting(false);
                },
              });
        }}
      >
        <FForm>
          <FInput
            data-test-id='token-box'
            label={t('auth.apiTokens.modal.description')}
            size='large'
            name='description'
            disabled={!!loading}
            placeholder={t('common.enter-descripiton')}
          />
          {apiTokenType === 'tenant' && (
            <FSelect
              data-test-id='roles-btn'
              size='medium'
              label={t('common.roles')}
              multiselect
              name='roles'
              disabled={!!loading}
              placeholder={t('common.select')}
              options={roles.map((r: ITeamUserRole) => ({ label: r.name, value: r.id }))}
            />
          )}

          <ErrorMessage error={error} />
          <div className='fe-dialog__footer'>
            <Grid container>
              <Grid xs item>
                <Button
                  size='large'
                  isCancel
                  fullWidth={false}
                  disabled={!!loading}
                  onClick={closeDialog}
                  data-test-id='cancel-btn'
                >
                  {t('common.cancel')}
                </Button>
              </Grid>
              <Grid xs item className='fe-text-align-end'>
                <FButton
                  data-test-id='submit-btn'
                  type='submit'
                  size='large'
                  disabled={!!loading}
                  fullWidth={false}
                  variant='primary'
                  loading={!!loading}
                >
                  {t('auth.apiTokens.modal.create')}
                </FButton>
              </Grid>
            </Grid>
          </div>
        </FForm>
      </Formik>
    </Dialog>
  );
};
