import React from 'react';
import Box from '@mui/material/Box';

import EntitlementComponent from './EntitlementComponent';
import FeatureComponent from './FeatureComponent';
import PermissionComponent from './PermissionComponent';

import './EntitlementBoxes.css';

enum HOOKS {
  FEATURE = 'useFeatureEntitlements',
  PERMISSION = 'usePermissionEntitlements',
  ENTITLEMENTS = 'useEntitlements',
}

const HOOKS_TO_COMPONENT = {
  [HOOKS.FEATURE]: FeatureComponent,
  [HOOKS.PERMISSION]: PermissionComponent,
  [HOOKS.ENTITLEMENTS]: EntitlementComponent,
};

const queries: any[] = [
  {
    featureKey: 'sso',
    UIComponent: HOOKS_TO_COMPONENT[HOOKS.FEATURE],
  },
  {
    featureKey: 'sso',
    UIComponent: HOOKS_TO_COMPONENT[HOOKS.FEATURE],
    customAttributes: { env: 'dev' },
  },
  {
    featureKey: 'proteins.*',
    UIComponent: HOOKS_TO_COMPONENT[HOOKS.ENTITLEMENTS],
    customAttributes: { pro: '20gr' },
  },
  {
    permissionKey: 'dora.protein.*',
    UIComponent: HOOKS_TO_COMPONENT[HOOKS.PERMISSION],
  },
  {
    permissionKey: 'fe.secure.*',
    UIComponent: HOOKS_TO_COMPONENT[HOOKS.ENTITLEMENTS],
  },
  {
    permissionKey: 'fe.secure.*',
    UIComponent: HOOKS_TO_COMPONENT[HOOKS.PERMISSION],
    customAttributes: { env: 'dev' },
  },
];

export const EntitlementBoxes = () => (
  <Box display='flex' flexWrap='wrap' justifyContent='center' mb={2}>
    {queries.map(({ UIComponent, ...rest }, i) => (
      <UIComponent key={i} {...rest} />
    ))}
  </Box>
);
