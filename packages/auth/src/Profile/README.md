## Profile Component
This collection contains built-in components to provide the ability to display your user profile,
change password and MFA (multi-factor authentication) settings.

## Usage

To use this component you need to import it from `@frontegg/react-auth`

```tsx
import { Profile } from '@frontegg/react-auth';

const AppRouter:FC = ()=> {

  return <div>
    {/* other routes... */}

    <Route path='/profile' component={Profile.Page}/>
  </div>
}
```
