import React from 'react';
import { CustomAttributes } from '@frontegg/types';
import EntitlementBase from './EntitlementsBase';
import { useEntitlements } from '@frontegg/react-hooks';
import { EntitledToOptions } from '@frontegg/redux-store';

const getDescription = ({
  featureKey,
  permissionKey,
  customAttributes,
}: {
  featureKey?: string;
  permissionKey?: string;
  customAttributes?: CustomAttributes;
}) =>
  `useEntitlements(${
    (featureKey && `{ featureKey: <b>${featureKey}</b> }`) ||
    (permissionKey && `{ permissionKey: <b>${permissionKey}</b> }`)
  }${customAttributes ? `, ${JSON.stringify(customAttributes).replaceAll('"', '').replaceAll(':', ': ')}` : ''}
  `;

const EntitlementComponent = ({
  featureKey,
  permissionKey,
  customAttributes,
}: {
  featureKey?: string;
  permissionKey?: string;
  customAttributes?: CustomAttributes;
}) => {
  const entitlementResult = useEntitlements(
    (featureKey ? { featureKey } : { permissionKey }) as EntitledToOptions,
    customAttributes
  );

  return (
    <EntitlementBase keyName={getDescription({ featureKey, permissionKey, customAttributes })} {...entitlementResult} />
  );
};

export default EntitlementComponent;
