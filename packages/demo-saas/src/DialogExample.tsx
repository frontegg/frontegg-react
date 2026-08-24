import React, { useState } from 'react';
import { FFormik, FForm, Button, Dialog, FInput, Grid } from '@frontegg/react-core';

const { Formik } = FFormik;

export const DialogExample = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        Open Modal
      </Button>

      <Dialog header={'My Dialog Header'} open={open} onClose={() => setOpen(false)}>
        <Formik
          initialValues={{
            name: 'John Smith',
            email: 'john.smith@gmail.com',
          }}
          onSubmit={() => {}}
        >
          <FForm>
            <FInput name='name' label='Name' />
            <FInput name='email' label='Email' />
            <div className='fe-dialog__footer'>
              <Grid container>
                <Grid xs item>
                  <Button size='large' isCancel>
                    Cancel
                  </Button>
                </Grid>
                <Grid xs item className='fe-text-align-end'>
                  <Button type='submit' size='large' fullWidth={false} variant='primary'>
                    Invite
                  </Button>
                </Grid>
              </Grid>
            </div>
          </FForm>
        </Formik>
      </Dialog>
    </div>
  );
};
