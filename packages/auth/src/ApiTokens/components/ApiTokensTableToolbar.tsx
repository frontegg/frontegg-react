import React, { FC } from 'react';
import { Button, Grid, Icon, Input, useT } from '@frontegg/react-core';
import { prefixCls } from '../constants';
import { useApiTokensActions, useApiTokensState } from '../hooks';

export const ApiTokensTableToolbar: FC = () => {
  const { setApiTokensState } = useApiTokensActions();
  const { searchValue } = useApiTokensState(({ searchValue }) => ({ searchValue }));

  const { t } = useT();

  return (
    <>
      <div className={`${prefixCls}__table-toolbar`}>
        <Grid container>
          <Grid item md={3} xs={6}>
            <Input
              data-test-id='search-box'
              fullWidth
              value={searchValue}
              type='search'
              onChange={(e) => setApiTokensState({ searchValue: e.target.value })}
              placeholder={`${t('common.search')}...`}
            />
          </Grid>
          <Grid item md={9} xs={6} className='fe-text-align-end'>
            <Button
              variant='primary'
              size='large'
              onClick={() => setApiTokensState({ showAddTokenDialog: true })}
              data-test-id='addNew-btn'
            >
              {t('auth.apiTokens.addNewToken')}
            </Button>
          </Grid>
        </Grid>
      </div>
    </>
  );
};
