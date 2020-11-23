import React, { FC, useMemo } from 'react';
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
  validateArrayLength,
  validateEmail,
  validateSchema,
} from '@frontegg/react-core';
import { useAuthTeamActions, useAuthTeamState } from './hooks';

const { Formik } = FFormik;

type AddUserFormValues = {
  name: string;
  email: string;
  roles: { label: string; value: string }[];
};
export const TeamAddUserDialog: FC = (props) => {
  const { open, error, loading, roles } = useAuthTeamState(({ addUserDialogState, roles }) => ({
    ...addUserDialogState,
    roles,
  }));
  const { addUser, closeAddUserDialog } = useAuthTeamActions();
  const { t } = useT();

  const roleOptions = useMemo(() => roles.map((role) => ({ label: role.name, value: role.id })), [roles]);

  const initialValues: AddUserFormValues = {
    name: '',
    email: '',
    roles: [],
  };

  return (
    <Dialog open={open} size={'tiny'} onClose={closeAddUserDialog} header={t('auth.team.add-dialog.title')}>
      <Formik
        validationSchema={validateSchema({
          email: validateEmail(t),
        })}
        initialValues={initialValues}
        onSubmit={({ name, email, roles }, { setSubmitting }) => {
          setSubmitting(true);
          addUser({
            name,
            email,
            roleIds: roles.map((v) => v.value),
            callback: () => setSubmitting(false),
          });
        }}
      >
        <FForm>
          <FInput
            label={t('common.name')}
            size='large'
            name='name'
            disabled={loading}
            placeholder={t('common.enter-name')}
          />
          <FInput
            label={t('common.email')}
            size='large'
            name='email'
            disabled={loading}
            placeholder={t('common.enter-email')}
          />
          <FSelect
            size='large'
            label={t('common.roles')}
            multiselect
            name='roles'
            disabled={loading}
            placeholder={t('common.select')}
            options={roleOptions}
          />

          <ErrorMessage error={error} />
          <div className='fe-dialog__footer'>
            <Grid container>
              <Grid xs item>
                <Button size='large' isCancel fullWidth={false} disabled={loading} onClick={() => closeAddUserDialog()}>
                  {t('common.cancel')}
                </Button>
              </Grid>
              <Grid xs item className='fe-text-align-end'>
                <FButton type='submit' size='large' fullWidth={false} variant='primary' loading={loading}>
                  {t('common.invite')}
                </FButton>
              </Grid>
            </Grid>
          </div>
        </FForm>
      </Formik>
    </Dialog>
  );
};
