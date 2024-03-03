import React from 'react';
import { CustomAttributes } from '@frontegg/types';
import EntitlementBase from './EntitlementsBase';
import { usePermissionEntitlements } from '@frontegg/react-hooks';

const PermissionComponent = ({
  permissionKey,
  customAttributes,
}: {
  permissionKey: string;
  customAttributes?: CustomAttributes;
}) => {
  const entitlementResult = usePermissionEntitlements(permissionKey, customAttributes);

  return (
    <EntitlementBase
      keyName={`usePermissionEntitlements(<b>${permissionKey}</b>${
        customAttributes ? `, ${JSON.stringify(customAttributes).replaceAll('"', '').replaceAll(':', ': ')}` : ''
      })`}
      {...entitlementResult}
    />
  );
};

export default PermissionComponent;
