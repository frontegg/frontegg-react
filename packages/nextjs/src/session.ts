import { IncomingMessage } from 'http';
import { FronteggNextJSSession } from './types';
import cookie from 'cookie';
import fronteggConfig from './FronteggConfig';
import { unsealData } from 'iron-session';
import { jwtVerify } from 'jose';
import { ParsedUrlQuery } from 'querystring';
import { GetServerSidePropsContext, GetServerSidePropsResult, PreviewData } from 'next';

export async function getSession(req: IncomingMessage): Promise<FronteggNextJSSession | undefined> {
  try {
    const sealFromCookies = cookie.parse(req.headers.cookie || '')[fronteggConfig.cookieName];
    if (!sealFromCookies) {
      return undefined;
    }
    const jwt: string = await unsealData(sealFromCookies, { password: fronteggConfig.passwordsAsMap });
    const publicKey = await fronteggConfig.getJwtPublicKey();
    const { payload }: any = await jwtVerify(jwt, publicKey);
    const session: FronteggNextJSSession = {
      accessToken: jwt,
      user: payload,
    };
    if (session.user.exp * 1000 < Date.now()) {
      return undefined;
    }
    return session;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

export function withSSRSession<
  P extends { [key: string]: any } = { [key: string]: any },
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData
>(
  handler: (
    context: GetServerSidePropsContext<Q>,
    session: FronteggNextJSSession
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
) {
  return async (context: GetServerSidePropsContext<Q>): Promise<GetServerSidePropsResult<P>> => {
    const session = await getSession(context.req);
    if (session) {
      return handler(context, session);
    } else {
      return {
        redirect: {
          permanent: false,
          destination: `/account/login?redirectUrl=${encodeURIComponent(context.req.url!)}`,
        },
        props: {},
      } as GetServerSidePropsResult<P>;
    }
  };
}
