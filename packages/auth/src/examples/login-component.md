## Login Component

Login components contains sub-components for easy integration with:

- Standard Password authentication
- SSO Redirect
- Multi-Factor verification

### Basic

By default, the login screen it automatically injected into React Router. For customization, you need to
disabled `injectAuthRoutes` in you `AuthPlugin`:

```tsx
/* withFrontegg.ts file */

import { FronteggProvider } from './FronteggProvider';

/* ... */

const plugins = [
  AuthPlugin({
    injectAuthRoutes: false,
    //...rest options
  })
];

/* ... */
```

