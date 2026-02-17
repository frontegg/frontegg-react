import React, { useCallback } from 'react';
import { ScimGuideDialog } from '@frontegg/react';
import { wrapWithBaseHomePage } from '../BaseHomePage/BaseHomePage';

const Page = () => {
  const handleGuideClose = useCallback((result: any) => {
    console.log('SCIM Guide closed with result:', result);
  }, []);

  return (
    <div style={{ width: '500px' }}>
      <h1>SCIM Guide Dialog</h1>
      <ScimGuideDialog
        props={{
          id: 'scim-guide-dialog',
          onClose: handleGuideClose,
          getConnectionName: (provider: any) => `${provider.name} - ${provider.id}`,
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
