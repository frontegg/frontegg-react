import type { AppInitialProps, AppType } from 'next/dist/shared/lib/utils';
import { refreshToken } from './helpers';
import { AppContext } from 'next/app';
import { AppContextType, AppPropsType, NextComponentType } from 'next/dist/shared/lib/utils';
import { FronteggNextJSSession } from './types';

const withFronteggApp = (
  app: AppType
): NextComponentType<AppContextType & { session: FronteggNextJSSession | null }, AppInitialProps, AppPropsType> => {
  type GetInitialProps = NextComponentType<
    AppContextType & { session: FronteggNextJSSession | null },
    AppInitialProps,
    AppPropsType
  >['getInitialProps'];
  const originalGetInitialProps: GetInitialProps | undefined = app.getInitialProps;

  app.getInitialProps = async (
    appContext: AppContext & { session: FronteggNextJSSession | null }
  ): Promise<AppInitialProps> => {
    const { ctx, Component } = appContext;
    const envPageProps: AppInitialProps['pageProps'] = {
      envAppUrl: process.env.FRONTEGG_APP_URL,
      envBaseUrl: process.env.FRONTEGG_BASE_URL,
      envClientId: process.env.FRONTEGG_CLIENT_ID,
    };

    if (ctx.req?.url?.indexOf('/_next/data/') === -1) {
      const session = await refreshToken(ctx);
      appContext.session = session;
      return {
        pageProps: {
          ...(originalGetInitialProps ? await originalGetInitialProps(appContext) : {}),
          ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
          ...envPageProps,
          session,
        },
      };
    } else {
      appContext.session = null;
      return {
        pageProps: {
          ...(originalGetInitialProps ? await originalGetInitialProps(appContext) : {}),
          ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
          ...envPageProps,
        },
      };
    }
  };

  return app;
};
export default withFronteggApp;
