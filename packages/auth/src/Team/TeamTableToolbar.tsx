import React, { useCallback, useEffect, useState } from 'react';
import { Button, Grid, Icon, Input, useT, useDebounce } from '@frontegg/react-core';
import { useAuthTeamActions, useAuthTeamState } from '../hooks';

export const TeamTableToolbar = () => {
  const { filter: filters } = useAuthTeamState((state) => ({ filter: state.filter || [] }));
  const { openAddUserDialog, loadUsers } = useAuthTeamActions();
  const [inputValue, setInputValue] = useState<string | undefined>(undefined);
  const searchValue = useDebounce(inputValue, 400);
  const { t } = useT();

  useEffect(() => {
    const newFilters = [];
    if (inputValue) {
      newFilters.push({
        id: 'searchFilter',
        value: searchValue,
      });
    }
    loadUsers({
      pageOffset: 0,
      filter: [...filters.filter((f) => f.id !== 'searchFilter'), ...newFilters],
    });
  }, [searchValue]);

  return (
    <div className='fe-team__table-toolbar'>
      <Grid container spacing={2}>
        <Grid item md={4} xs={6}>
          <Input
            size='small'
            label={t('auth.team.search-users')}
            fullWidth
            onChange={(e) => setInputValue(e.target.value)}
          />
        </Grid>
        <Grid item md={8} xs={6} className='fe-text-align-end'>
          <Button variant='primary' size='large' onClick={() => openAddUserDialog()}>
            {t('auth.team.invite-user')} <Icon className='fe-ml-1' name='person-add' />
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};
