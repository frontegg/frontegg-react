import React from 'react';
import { CustomAttributes } from '@frontegg/types';
import EntitlementBase from './EntitlementsBase';
import { useFeatureEntitlements } from '@frontegg/react-hooks';

const FeatureComponent = ({
  featureKey,
  customAttributes,
}: {
  featureKey: string;
  customAttributes?: CustomAttributes;
}) => {
  const entitlementResult = useFeatureEntitlements(featureKey, customAttributes);

  return (
    <EntitlementBase
      keyName={`useFeatureEntitlements(<b>${featureKey}</b>${
        customAttributes ? `, ${JSON.stringify(customAttributes).replaceAll('"', '').replaceAll(':', ': ')}` : ''
      })`}
      {...entitlementResult}
    />
  );
};

export default FeatureComponent;
