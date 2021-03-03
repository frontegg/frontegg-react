import React, { FC, useMemo } from 'react';
import { Select, FFormik, ErrorMessage, FButton, useT } from '@frontegg/react-core';
import { useSSOState } from '@frontegg/react-hooks/auth';

const { useFormikContext } = FFormik;

export const SSOManageAuthorizationSelect: FC = () => {
  const { t } = useT();
  const {
    setFieldValue,
    values: { authorizationRoles },
    dirty,
  } = useFormikContext<any>();
  const { roles: allRoles, saving, error } = useSSOState(({ roles, saving, error }) => ({ roles, saving, error }));

  const selectValue = useMemo(() => {
    return allRoles
      ?.filter((role) => authorizationRoles?.find((arole: string) => arole === role.id))
      .map((role) => ({ value: role.id, label: role.name }));
  }, [authorizationRoles, allRoles]);

  const selectOptions = useMemo(() => allRoles?.map((role) => ({ value: role.id, label: role.name })), [allRoles]);

  const handleChange = (v: any[]) => {
    const preparedRoles = v.map((v) => v.value);
    setFieldValue('authorizationRoles', preparedRoles);
  };

  return (
    <div className='fe-sso-authorization-page__select'>
      <div className='fe-sso-authorization-page__select-container'>
        <Select
          value={selectValue}
          multiselect
          options={selectOptions || []}
          onChange={(_, values) => handleChange(values)}
        />
      </div>
      <ErrorMessage error={error} separator />
      <div className='fe-sso-authorization-page__select-footer'>
        <FButton
          loading={!!saving}
          fullWidth={false}
          size='large'
          variant='primary'
          type='submit'
          data-test-id='submit-btn'
        >
          {!dirty && !!authorizationRoles.length && !saving ? t('common.configured') : t('common.configure')}
        </FButton>
      </div>
    </div>
  );
};
