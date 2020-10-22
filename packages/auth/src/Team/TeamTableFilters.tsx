import { Button, FilterComponent, Grid, Select, useT } from '@frontegg/react-core';
import React, { useMemo, useState } from 'react';
import { useAuthTeamState } from '../hooks';

export const TeamRolesFilter: FilterComponent = ({ value, setFilterValue, closePopup }) => {
  const { t } = useT();
  const { roles } = useAuthTeamState(({ roles }) => ({ roles }));
  const roleOptions = useMemo(() => roles.map((role) => ({ label: role.name, value: role.id })), [roles]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>(value || []);

  return (
    <div className='fe-team__filter-popup-md'>
      <div className='fe-team__filter-title fe-mb-2'>Filter by permissions</div>
      <Select
        fullWidth
        size='small'
        multiselect
        value={selectedRoles}
        onChange={(e, newValues) => {
          setSelectedRoles(newValues);
        }}
        options={roleOptions}
      />
      <div className='fe-mt-2'>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <Button
              fullWidth
              onClick={() => {
                setFilterValue(null);
                closePopup?.();
              }}
            >
              {(value && value.length > 0) || selectedRoles.length > 0 ? t('common.clear') : t('common.cancel')}
            </Button>
          </Grid>
          <Grid item xs={2} />
          <Grid item xs={5}>
            <Button
              fullWidth
              variant='primary'
              onClick={() => {
                setFilterValue(selectedRoles);
                closePopup?.();
              }}
            >
              {t('common.filter')}
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
