import React, { useCallback, useEffect } from 'react';
import { SsoGuideDialog, useAuthActions } from '@frontegg/react';
import { wrapWithBaseHomePage } from '../BaseHomePage/BaseHomePage';

const Page = () => {
  const handleGuideClose = useCallback((result: any) => {
    console.log('Guide closed with result:', result);
  }, []);
  const { loadSSOConfigurationsV2 } = useAuthActions();
  useEffect(() => {
    loadSSOConfigurationsV2();
  }, [loadSSOConfigurationsV2]);

  return (
    <div style={{ width: '500px' }}>
      <h1>SSO Guide Dialog</h1>
      <SsoGuideDialog
        props={{
          id: 'sso-guide-dialog',
          onClose: handleGuideClose,
          showSelector: true,
        }}
        themeOptions={{}}
        containerStyle={{
          display: 'block',
          flexDirection: undefined,
        }}
      />
    </div>
  );
};

export default wrapWithBaseHomePage(Page, {
  width: '95vw',
  minWidth: '1200px',
});
