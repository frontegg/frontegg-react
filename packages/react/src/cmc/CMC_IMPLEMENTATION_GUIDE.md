# CMC (Custom Modal Component) Implementation Guide

This guide documents how to add a new CMC component to the demo-saas app.

## Overview

CMC components are React wrappers around `@frontegg/js` render functions. They allow embedding Frontegg admin portal components directly into your application.

## Architecture

```
@frontegg/js (FronteggApp)
    ↓ renderXxx methods
packages/react/src/cmc/cmc-base.tsx (CMCComponent)
    ↓ wraps render methods
packages/react/src/cmc/cmc-components.tsx (Exported components)
    ↓ used in
packages/demo-saas/src/cmc/CMCXxxPage.tsx (Demo pages)
```

## Files to Modify/Create

### 1. Check if the render method exists in `@frontegg/js`

The component must have a corresponding render method in `FronteggApp`. Current methods:
- `renderChangePasswordForm`
- `renderInviteUserDialog`
- `renderProfilePage`
- `renderUsersTable`
- `renderSsoGuideDialog`

### 2. Update `cmc-base.tsx` (if adding a new render method)

Add the new render method to `RenderableFronteggComponent` type:

```typescript
export type RenderableFronteggComponent = keyof Pick<
  FronteggApp,
  | 'renderChangePasswordForm'
  | 'renderInviteUserDialog'
  | 'renderProfilePage'
  | 'renderUsersTable'
  | 'renderSsoGuideDialog'
  | 'renderNewComponent'  // Add new method here
>;
```

### 3. Add component wrapper in `cmc-components.tsx`

```typescript
import { NewComponentProps } from '@frontegg/types';

export const NewComponent: FC<FronteggCMCComponentProps<NewComponentProps>> = (props) => {
  return <CMCComponent renderComponent='renderNewComponent' {...props} />;
};
```

### 4. Export from `@frontegg/react` index

Make sure the new component is exported from the package's index file.

### 5. Create demo page in `demo-saas`

Create a new file: `packages/demo-saas/src/cmc/CMCNewComponentPage.tsx`

```typescript
import React, { useCallback, useEffect } from 'react';
import { NewComponent, useAuthActions } from '@frontegg/react';
import { wrapWithBaseHomePage } from '../BaseHomePage/BaseHomePage';

const Page = () => {
  // Optional: Load any required data
  const { loadRequiredData } = useAuthActions();
  useEffect(() => {
    loadRequiredData();
  }, [loadRequiredData]);

  // Optional: Handle callbacks
  const handleClose = useCallback((result: any) => {
    console.log('Component closed with result:', result);
  }, []);

  return (
    <div style={{ width: '500px' }}>
      <h1>New Component</h1>
      <NewComponent
        props={{
          onClose: handleClose,
          // ... other props from NewComponentProps
        }}
        themeOptions={{}}
        containerStyle={{
          // Styles passed to @frontegg/js render method
        }}
        hostStyle={{
          // Styles for the wrapper div
        }}
      />
    </div>
  );
};

export default wrapWithBaseHomePage(Page, {
  width: '80vw',
  minWidth: '300px',
});
```

### 6. Add route in `Links.tsx`

```typescript
export const ROUTE_PATHS = {
  // ... existing routes
  CMC_NEW_COMPONENT: '/cmc-new-component',
};

const links = [
  // ... existing links
  { route: ROUTE_PATHS.CMC_NEW_COMPONENT, label: 'CMC New Component' },
];
```

### 7. Add route in `App.tsx`

```typescript
import CMCNewComponentPage from './cmc/CMCNewComponentPage';

// In the Switch component:
<Route path={ROUTE_PATHS.CMC_NEW_COMPONENT} exact render={CMCNewComponentPage} />
```

## Props Reference

### `FronteggCMCComponentProps<T>`

| Prop | Type | Description |
|------|------|-------------|
| `props` | `T` | Component-specific props (e.g., `onClose`, `showSelector`) |
| `themeOptions` | `object` | MUI theme overrides for admin portal components |
| `localizations` | `object` | Localization strings |
| `hostStyle` | `CSSProperties` | Styles for the wrapper `<div>` element |
| `containerStyle` | `CSSProperties` | Styles passed to `@frontegg/js` render method |

## Styling Notes

1. **`hostStyle`** - Applied to the React wrapper div. Use for positioning and sizing the container.

2. **`containerStyle`** - Passed to `@frontegg/js` and applied to the internal container. Use for styling the rendered content.

3. **`themeOptions`** - MUI theme overrides. Structure:
   ```typescript
   themeOptions={{
     adminPortal: {
       components: {
         MuiComponent: {
           styleOverrides: {
             root: { /* styles */ },
           },
         },
       },
     },
   }}
   ```

4. **Width considerations** - The parent container width affects internal layout. Some components (like SsoGuideDialog) have responsive layouts that change based on available width.

## Common Patterns

### Loading data before render

Some CMC components require data to be loaded first:

```typescript
const { loadSSOConfigurationsV2 } = useAuthActions();
useEffect(() => {
  loadSSOConfigurationsV2();
}, [loadSSOConfigurationsV2]);
```

### Handling dialog close

```typescript
const handleClose = useCallback((result: any) => {
  console.log('Closed with result:', result);
  // Navigate away, show success message, etc.
}, []);

<Component props={{ onClose: handleClose }} />
```

## Existing CMC Components

| Component | Render Method | Props Type | Description |
|-----------|---------------|------------|-------------|
| `UsersTable` | `renderUsersTable` | `UsersTableProps` | User management table |
| `InviteUserDialog` | `renderInviteUserDialog` | `InviteUserDialogProps` | User invitation modal |
| `ChangePasswordForm` | `renderChangePasswordForm` | `ChangePasswordFormProps` | Password change form |
| `ProfilePage` | `renderProfilePage` | `ProfilePageProps` | User profile page |
| `SsoGuideDialog` | `renderSsoGuideDialog` | `SsoGuideDialogProps` | SSO configuration guide |
