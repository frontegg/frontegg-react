## SSO (Single Sign On)

This collection contains built-in components to provide the ability to display your sso configuration, update and etc.

## Usage

To use this component you only need to import is from `@frontegg/react-auth`

```tsx
import { SSO } from '@frontegg/react-auth';

const AppRouter:FC = ()=> {

  return <div>
    {/* other routes... */}

    <Route path='/sso' component={SSO.Page}/>
  </div>
}
```
## Customization

In order to provide a **fully customizable** component, *Frontegg* team building their components with Compound Components design pattern.

This design gives you the ability to inject your custom components inside the built-in component.

Here are some examples of how to customized the **SSO** components:

- [Custom header title](#custom-header-title)
- [Render without header](#render-header-title)
- [Inject custom header](#inject-custom-header)
- [Inject element inside overview](#inject-element-inside-overview)
- [Custom toggle button](#inject-element-inside-overview)
- [Change SSO guide text](#change-sso-guide-text)

<font color='red'>**NOTE!**:</font> **In you pass children to the SSO components
will render it without any inner component, if you want to customize a specific element
you need to add the other inner components to the parent component, see bellow examples!**

### Custom header title:

In this example, we have injected the inner built-in components to the `SSO` as `children`,
and passed `title` property to the `SSO.Header` to override its default `title` value.

Notice that we also added the `<SSO.Router>`, this is because how Compound Components Design works.
So you need to pass the default inner components if you don't want to override.
```tsx
import { SSO } from '@frontegg/react-auth';

//...
  <SSO.Page>
    <SSO.Header title='My Custom Header Title'/>
    <SSO.Router/>
  </SSO.Page>
//...
```

### Render without header:

In this example, we have two options to hide the `SSO.Header`:
1. pass hide property to the `SSO.Header` component.
2. just remove it from `SSO.Page` children.

Sometimes there is a specific component
```tsx
import { SSO } from '@frontegg/react-auth';

//...
  <SSO.Page>
    <SSO.Header title='My Custom Header Title'/>
    <SSO.Router/>
  </SSO.Page>
//...
```

