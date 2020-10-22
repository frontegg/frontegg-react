import React, { FC, useMemo } from 'react';
import { useAuthTeamState, useAuthTeamActions } from '../hooks';
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
  validateLength,
  validateSchema,
  validateTwoFactorCode,
} from '@frontegg/react-core';

const { Formik } = FFormik;

export interface TeamAddUserDialogProps {
  open?: boolean;
}

type AddUserFormValues = {
  name: string;
  email: string;
  permissions: { label: string; value: string }[];
};
export const TeamAddUserDialog: FC<TeamAddUserDialogProps> = (props) => {
  const { open, error, loading, roles } = useAuthTeamState(({ addUserDialogState, roles }) => ({
    ...addUserDialogState,
    roles,
  }));
  const { addUser, closeAddUserDialog } = useAuthTeamActions();
  const { t } = useT();

  const isOpen = props.open ?? open;
  const roleOptions = useMemo(() => roles.map((role) => ({ label: role.name, value: role.id })), [roles]);

  const initialValues: AddUserFormValues = {
    name: '',
    email: '',
    permissions: [],
  };

  return (
    <Dialog open={isOpen} size={'tiny'} header={t('auth.team.add-dialog.title')}>
      <Formik
        validationSchema={validateSchema({
          name: validateLength('Name', t),
          email: validateEmail(t),
          permissions: validateArrayLength(t, 'Permissions'),
        })}
        initialValues={initialValues}
        onSubmit={({ name, email, permissions }) => {
          addUser({
            name,
            email,
            roleIds: permissions.map((v) => v.value),
          });
        }}
      >
        <FForm>
          <FInput label={t('common.name')} name='name' disabled={loading} placeholder={t('common.enter-name')} />
          <FInput label={t('common.email')} name='email' disabled={loading} placeholder={t('common.enter-email')} />
          <FSelect
            label={t('common.permissions')}
            multiselect
            name='permissions'
            disabled={loading}
            placeholder={t('common.select')}
            options={roleOptions}
          />

          <ErrorMessage error={error} />
          <Grid container className='fe-mt-4 fe-mb-2'>
            <Grid xs item>
              <Button size='large' fullWidth={false} disabled={loading} onClick={() => closeAddUserDialog()}>
                {t('common.cancel')}
              </Button>
            </Grid>
            <Grid xs item className='fe-text-align-end'>
              <FButton type='submit' size='large' fullWidth={false} variant='primary' loading={loading}>
                {t('common.invite')}
              </FButton>
            </Grid>
          </Grid>
        </FForm>
      </Formik>
    </Dialog>
  );
};
