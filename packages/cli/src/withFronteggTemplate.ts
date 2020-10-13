export default `import React{{#if typescript}}, { ComponentType }{{/if}} from 'react';
import { {{#if typescript}}ContextOptions, PluginConfig, {{/if}}FronteggProvider } from '@frontegg/react-core';
import { uiLibrary } from '@frontegg/react-elements-{{uiLibrary}}';
{{{imports}}}

/**
 * use this object to config Frontegg global context object
 */
const contextOptions{{#if typescript}}: ContextOptions{{/if}} = {
  baseUrl: \`{{baseUrl}}\`,
  requestCredentials: 'include',
};

const plugins{{#if typescript}}: PluginConfig[]{{/if}} = [
  // add frontegg plugin here
{{plugins}}
];

/**
 *  Wrap you entire application with this HOC.
 *  NOTE: Make sure to remove any BrowserRouter in your application if you use \`\`\`withRouter\`\`\` option
 */
{{#if typescript}}
export const withFrontegg = <P extends {}>(AppComponent: ComponentType<P>) => (props: P) => {
{{else}}
export const withFrontegg = (AppComponent) => (props) => {
{{/if}}
  return <FronteggProvider
    plugins={plugins}
    context={contextOptions}
    uiLibrary={uiLibrary}>
    <AppComponent {...props}/>
  </FronteggProvider>;
};`;
