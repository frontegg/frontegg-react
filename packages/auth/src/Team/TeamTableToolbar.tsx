import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Grid, Icon, Input, useT, useDebounce } from '@frontegg/react-core';
import { useAuthTeamActions, useAuthTeamState } from './hooks';

export const TeamTableToolbar = () => {
  const { filter: filters } = useAuthTeamState((state) => ({ filter: state.filter || [] }));
  const { openAddUserDialog, loadUsers } = useAuthTeamActions();
  const [inputValue, setInputValue] = useState<string | undefined>(undefined);
  const searchValue = useDebounce(inputValue, 400);
  const didMountRef = useRef(true);
  const { t } = useT();

  useEffect(() => {
    if (didMountRef.current) {
      didMountRef.current = false;
      return;
    }
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
      <Grid container>
        <Grid item md={3} xs={6}>
          <Input
            type={'search'}
            placeholder={t('auth.team.search-users')}
            fullWidth
            onChange={(e) => setInputValue(e.target.value)}
          />
        </Grid>
        <Grid item md={9} xs={6} className='fe-text-align-end'>
          <Button variant='primary' size='large' onClick={() => openAddUserDialog()}>
            {t('auth.team.invite-user')} <Icon className='fe-ml-1' name='person-add' />
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};
