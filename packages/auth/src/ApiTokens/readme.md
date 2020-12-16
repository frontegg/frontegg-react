## Api Tokens (Single Sign On)
This collection contains built-in components to provide the ability to display your Tenant/User Api Tokens configuration, updates and etc.

## Usage

To use this components you need to import it from `@frontegg/react-auth`

```tsx
import { TenantApiTokens, UserApiTokens } from '@frontegg/react-auth';

const AppRouter:FC = ()=> {

  return <div>
    {/* other routes... */}

    <Route path='/tenant-api-tokens' component={TenantApiTokens.Page}/>
    <Route path='/user-api-tokens' component={UserApiTokens.Page}/>
  </div>
}
```

![Base Example Result](imgs/api-tokens-basic-example.png)

## Customization

In order to provide a **fully customizable** component, *Frontegg* team building their components with Compound Components design pattern.

This design gives you the ability to inject your custom components inside the built-in component.

<font color='red'>**NOTE!**:</font> **If you pass a child to the Api Tokens component
it will be rendered without any inner default components, then if you want to customize a specific element
you need to add the other inner default components to it, see bellow examples of how
you can override single component:**

**You can find the default render method foreach Api Tokens component [here](#default-rendered-components)**

### Default Rendered Components for Tenant Api Tokens component

- [`TenantApiTokens.Page`](./TenantApiTokens/TenantApiTokensPage.tsx)
  - [`TenantApiTokens.Header`](./components/ApiTokensHeader.tsx)
  - [`TenantApiTokens.Layout`](./components/ApiTokensLayout.tsx)
    - [`TenantApiTokens.Toolbar`](./components/ApiTokensTableToolbar.tsx)
    - [`TenantApiTokens.Table`](./components/ApiTokensTableComponent.tsx)
    - [`TenantApiTokens.AddDialog`](./components/ApiTokensAddDialog.tsx)
    - [`TenantApiTokens.SuccessDialog`](./components/SuccessDialog.tsx)
    - [`TenantApiTokens.DeleteDialog`](./components/ApiTokensDeleteDialog.tsx)

### Default Rendered Components for User Api Tokens component

- [`UserApiTokens.Page`](./UserApiTokens/UserApiTokensPagePage.tsx)
  - [`UserApiTokens.Header`](./components/ApiTokensHeader.tsx)
  - [`UserApiTokens.Layout`](./components/ApiTokensLayout.tsx)
    - [`UserApiTokens.Toolbar`](./components/ApiTokensTableToolbar.tsx)
    - [`UserApiTokens.Table`](./components/ApiTokensTableComponent.tsx)
    - [`UserApiTokens.AddDialog`](./components/ApiTokensAddDialog.tsx)
    - [`UserApiTokens.SuccessDialog`](./components/SuccessDialog.tsx)
    - [`UserApiTokens.DeleteDialog`](./components/ApiTokensDeleteDialog.tsx)



## Examples

Here are some examples of how to customize the **User/Tenant Api Tokens** components:

- [Custom header title](#custom-header-title)
- [Render without header](#render-header-title)
- [Inject custom header](#inject-custom-header)
- [Inject element inside layout](#inject-element-inside-layout)
- [Hide 'Created By' column for Tenant Api Tokens table](#hide-created-by-column-for-tenant-api-tokens-table)
- `Change dialog windows and toolbar` (coming soon)

### Custom header title:

In this example, we have injected the inner built-in components to the `TenantApiTokens/UserApiTokens` as `children`,
and passed `title` property to the `TenantApiTokens/UserApiTokens.Header` to override its default `title` value.

Notice that we also added the `<TenantApiTokens/UserApiTokens.Layout>`, this is because how Compound Components Design works.
So you need to pass the default inner components if you don't want to override.
```tsx

import { TenantApiTokens } from '@frontegg/react-auth';

render() {
  <TenantApiTokens.Page>
    <TenantApiTokens.Header title='My Custom Header Title'/>
    <TenantApiTokens.Layout/>
  </TenantApiTokens.Page>
}
```

### Render without header:

In this example, we have two options to hide the `TenantApiTokens/UserApiTokens.Header`:
1. pass hide property to the `TenantApiTokens/UserApiTokens.Header` component.
2. just remove it from `TenantApiTokens/UserApiTokens.Page` children.

Sometimes there is a specific component
```tsx
import { TenantApiTokens } from '@frontegg/react-auth';

render() {
// option 1
  <TenantApiTokens.Page>
    <TenantApiTokens.Header hide/>
    <TenantApiTokens.Layout/>
  </TenantApiTokens.Page>

// option 2
  <TenantApiTokens.Page>
    <TenantApiTokens.Layout/>
  </TenantApiTokens.Page>
}
```

### Inject custom header:

```tsx
import { TenantApiTokens } from '@frontegg/react-auth';
import { MyCustomHeader } from './MyCustomHeader';

render() {
  <TenantApiTokens.Page>
    <MyCustomHeader/>
    <TenantApiTokens.Layout/>
  </TenantApiTokens.Page>
}

```


### Inject element inside Layout:

```tsx
import { TenantApiTokens } from '@frontegg/react-auth';

render() {
  <TenantApiTokens.Page>
    <TenantApiTokens.Header/>
    <TenantApiTokens.Layout>
      <TenantApiTokens.Toolbar />
       <div>
          this element inject between Api Tokens toolbar and table.
      </div>
      <TenantApiTokens.Table />
      <TenantApiTokens.AddDialog />
      <TenantApiTokens.SuccessDialog />
      <TenantApiTokens.DeleteDialog />
    </TenantApiTokens.Layout>
  </TenantApiTokens.Page>
}

```


### Hide Created By column for Tenant Api Tokens table:

```tsx
import { TenantApiTokens } from '@frontegg/react-auth';

render() {
  <TenantApiTokens.Page createdByUserIdColumn='hide' />
}
```




