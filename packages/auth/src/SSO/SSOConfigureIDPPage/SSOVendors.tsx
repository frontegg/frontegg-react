import React, { FC } from 'react';

export enum SamlVendors {
  Saml = 'Saml',
  Okta = 'Okta',
  Azure = 'Azure',
  Google = 'Google',
}

export const SamlIcon: FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' {...props} viewBox='0 0 20 20'>
      <path
        d='M8.642 11.268l-2.6-2.6a.978.978 0 00-1.382 1.384l4.232 4.233a.919.919 0 00.095.063.964.964 0 00.2.135c.012.005.023.014.035.019a.964.964 0 00.792 0c.014-.005.025-.015.039-.021a.984.984 0 00.2-.131.957.957 0 00.1-.065l4.232-4.233a.978.978 0 00-1.383-1.383l-2.6 2.6.01-11.218a9.69 9.69 0 00-1.984 0l.017 11.216z'
        fill='#6a6a6a'
      />
      <path d='M12.538.449v2.1a7.663 7.663 0 11-5.843 0V.456a9.62 9.62 0 105.843 0' fill='#6a6a6a' />
    </svg>
  );
};

export const OktaIcon: FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' {...props} viewBox='0 0 43 22'>
      <path
        fill='#0a7ec2'
        d='M11.362 8.92a3.464 3.464 0 10-.003 6.928 3.464 3.464 0 00.003-6.928m0 5.196a1.733 1.733 0 111.732-1.732v.001c0 .956-.776 1.731-1.732 1.731M17.45 13.546a.303.303 0 01.52-.213c.864.883 2.296 2.395 2.305 2.404.031.04.076.068.125.08a.573.573 0 00.148.015h1.562a.304.304 0 00.234-.49l-2.586-2.653-.135-.142c-.298-.358-.263-.49.077-.846l2.058-2.295a.308.308 0 00-.24-.5h-1.42a.447.447 0 00-.135.021.282.282 0 00-.138.085l-1.842 1.993a.309.309 0 01-.533-.209v-3.94a.283.283 0 00-.298-.284h-1.16a.276.276 0 00-.292.272v8.72a.264.264 0 00.291.268h1.159c.158.002.29-.12.3-.277zM26.898 15.52l-.125-1.161a.278.278 0 00-.322-.244 1.733 1.733 0 01-2-1.618V10.99a.327.327 0 01.32-.335h1.564a.289.289 0 00.278-.299V9.258a.296.296 0 00-.266-.32h-1.561a.317.317 0 01-.328-.315V6.864a.284.284 0 00-.3-.28h-1.153a.268.268 0 00-.283.251V12.5a3.465 3.465 0 003.928 3.34.29.29 0 00.25-.318M35.24 14.064c-.98 0-1.125-.349-1.125-1.669V9.218c.001-.165-.132-.299-.297-.3H32.66a.305.305 0 00-.301.3v.15a3.465 3.465 0 10.542 5.648c.327.5.85.826 1.666.832.14 0 .875.025.875-.321v-1.232a.221.221 0 00-.2-.23m-4.594.051a1.733 1.733 0 110-3.465 1.733 1.733 0 010 3.465'
      />
    </svg>
  );
};

export const AzureIcon: FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' {...props} viewBox='0 0 23 23'>
      <path
        d='M11.518.006c.025 0 .05.03.086.085.03.05 2.617 3.127 5.75 6.84 3.133 3.711 5.689 6.765 5.676 6.784-.006.018-2.5 2.048-5.54 4.504-3.042 2.457-5.628 4.547-5.745 4.645-.202.164-.215.17-.288.097-.043-.042-2.636-2.145-5.763-4.675S.018 13.672.03 13.641c.013-.03 2.58-3.072 5.72-6.765C8.889 3.182 11.457.128 11.469.079c.012-.049.03-.073.049-.073z'
        fill='#00bef2'
      />
      <path
        d='M283.1 483.6c-5.8-2.1-12.8-8.1-15.7-13.7-3.6-6.9-3.3-17.7.7-26.3 3.1-6.4 3.1-6.6 1.1-8.1-1.1-.8-14.4-8.2-29.4-16.3-15-8.1-28.1-15.2-29-15.7-1.2-.7-3.2 0-6.8 2.3-11.7 7.4-23.9 6.6-33.5-2.3-6.9-6.4-8.9-10.9-8.9-20.1 0-8.9 1.8-13.5 7.5-19.2 7.7-7.7 18-10.3 27.9-7 5.4 1.8 5.5 1.8 8.9-.8 4-3 36.1-32.3 51.6-47l10.7-10.2-3.2-6.7c-6.5-13.5-3.2-28.5 8.2-37.5 6.2-4.9 10.8-6.4 19.7-6.4 20.8 0 35.3 21.8 27.5 41.3-2.1 5.4-2.1 5.5-.1 8.8 1.7 2.9 30.6 37.8 45.9 55.6 2.7 3.1 5.7 5.6 6.7 5.6s4.4-1 7.6-2.2c14.9-5.9 30.6.7 36.8 15.5 4 9.5.5 22.3-8 30-6 5.4-10.4 7.1-18.4 7.1-5.6 0-7.7-.6-13.6-3.8-4.4-2.4-7.8-3.6-9.2-3.2-2.4.6-39.3 25.9-47.5 32.5-5 4.1-5.4 5.6-2.8 11.7 2.5 6 2.2 15.4-.6 21.3-3.1 6.5-10.8 13-17.5 15-6.8 1.9-10.9 1.9-16.6-.2zm1.7-110.2v-57l-3.2-4.4c-1.8-2.4-3.5-4.4-3.8-4.4-1.3 0-65.9 58.7-65.9 59.9 0 .3 1 3.3 2.2 6.5 1.2 3.3 2.1 8 2 10.7-.1 2.7-.1 5.7-.1 6.7.1 2.3 21.7 16.1 54.1 34.8 8.9 5.2 12 6.5 13.1 5.6 1.3-1.1 1.6-12.2 1.6-58.4zm27.4 50.4c42.8-26.9 50.8-32.3 51.3-34.3.3-1.2.7-5.9.8-10.6l.3-8.4-21.8-25.9c-23.4-27.7-32-37.1-34-37.1-.7 0-4.2 2-7.8 4.4l-6.6 4.4.3 56.9c.3 51 .7 59.6 2.6 59.6.2.1 7-4 14.9-9z'
        fill='white'
        stroke='white'
        strokeWidth='1.236'
        strokeLinecap='round'
        strokeLinejoin='round'
        transform='matrix(.06143 0 0 .06095 -6.297 -10.13)'
      />
    </svg>
  );
};

export const GoogleIcon: FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' {...props} viewBox='0 0 23 23'>
      <path
        d='M1.265 6.344c.48-1.032 1.156-1.932 1.949-2.747C5.009 1.754 7.183.573 9.756.17c3.6-.563 6.824.269 9.609 2.618.176.149.22.236.028.42-.983.943-1.95 1.901-2.924 2.854-.1.098-.167.217-.344.058-2.452-2.201-6.455-2.176-9.06.198A7.323 7.323 0 005.116 9.23c-.06-.039-.124-.074-.182-.117l-3.67-2.769'
        fill='#d7282a'
        fillRule='evenodd'
      />
      <path
        d='M5.088 13.726c.352.875.789 1.702 1.438 2.404 1.65 1.787 3.697 2.557 6.148 2.308 1.14-.116 2.177-.494 3.147-1.075.093.082.181.169.28.244 1.134.868 2.27 1.734 3.407 2.601-1.253 1.166-2.732 1.942-4.396 2.354-3.922.971-7.538.357-10.749-2.125a10.72 10.72 0 01-3.107-3.795l3.832-2.916'
        fill='#45ac43'
        fillRule='evenodd'
      />
      <path
        d='M19.508 20.208c-1.136-.867-2.273-1.733-3.408-2.601-.098-.075-.186-.162-.28-.244.77-.575 1.412-1.255 1.833-2.12.168-.344.286-.705.398-1.07.077-.25.053-.349-.264-.346-1.89.016-3.782.008-5.672.008-.4 0-.401 0-.401-.406 0-1.256.006-2.511-.006-3.767-.002-.242.042-.335.32-.334 3.487.01 6.974.007 10.462.003.188 0 .306.013.339.238.434 2.988.086 5.843-1.51 8.48-.49.808-1.076 1.546-1.811 2.16'
        fill='#5d7fbe'
        fillRule='evenodd'
      />
      <path
        d='M5.088 13.726l-3.832 2.916c-.624-1.137-.984-2.358-1.152-3.63-.29-2.203.029-4.323.983-6.344.052-.111.119-.216.178-.324l3.67 2.77c.058.042.121.077.182.116-.512 1.496-.487 2.995-.029 4.496'
        fill='#f4c300'
        fillRule='evenodd'
      />
    </svg>
  );
};

export const SamlDetails = () => <></>;

export const OktaDetails = () => <></>;
export const AzureDetails = () => <></>;
export const GoogleDetails = () => <></>;
