import React, { useState, useEffect, useLayoutEffect } from 'react';
import { UsersTable, InviteUserDialog, ChangePasswordForm, ProfilePage, useUsersTable, useInviteUserDialog } from '@frontegg/react';
import { wrapWithBaseHomePage } from '../BaseHomePage/BaseHomePage';

const INVITE_DIALOG_ID = 'my-invite-dialog';

const Page = () => {
    const { openDialog: openInviteUserDialog, } = useInviteUserDialog(INVITE_DIALOG_ID);
    const { onSearch, } = useUsersTable();
    const [searchInput, setSearchInput] = useState<string | undefined>(undefined);
    const [openChangePasswordForm, setOpenChangePasswordForm] = useState<boolean>(false);
    useLayoutEffect(() => {
        const debounceTimeout = setTimeout(() => {
            if (searchInput !== undefined) {
                onSearch(searchInput);
            }
        }, 500); // 500ms debounce time

        return () => clearTimeout(debounceTimeout);
    }, [searchInput, onSearch]);

    return <div>

        <button onClick={() => {
            openInviteUserDialog()
            setOpenChangePasswordForm((state) => !state);
        }}>Open invite user dialog</button>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
                <h1>Profile Page</h1>
                <ProfilePage props={{}} hostStyle={{ width: '100%', height: '350px', marginBottom: '50px' }} />
            </div>
            <div>
                <h1>Users Table</h1>
                <input type="text" onChange={(e) => {
                    setSearchInput(e.target.value)
                }} />
                <UsersTable props={{}} themeOptions={{
                    adminPortal: {
                        components: {
                            MuiTableCell: {
                                styleOverrides: {
                                    head: {
                                        background: 'lightgreen',
                                        border: '1px solid red',
                                    },
                                    body: {
                                        background: 'pink',
                                        border: '1px solid red',
                                    },
                                },
                            },
                        },
                    }
                }} hostStyle={{ width: '100%', height: '450px', marginBottom: '50px' }} />

            </div>
            <div>
                <h1>Change Password Form</h1>
                <ChangePasswordForm props={{}} hostStyle={{ width: '100%', height: '520px', marginBottom: '50px' }} />
            </div>
            <InviteUserDialog props={{ id: INVITE_DIALOG_ID }} hostStyle={{ width: '100%', height: '0px', marginBottom: '50px' }} />
        </div>
    </div>
}

export default wrapWithBaseHomePage(Page, {
    width: '80vw',
    minWidth: '300px',
});