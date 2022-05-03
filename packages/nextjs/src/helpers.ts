import { IncomingMessage, ServerResponse } from 'http';
import cookie from 'cookie';
import { GetServerSidePropsContext, GetServerSidePropsResult, PreviewData } from 'next';
import { sealData, unsealData } from 'iron-session';
import fronteggConfig from './FronteggConfig';
import { decodeJwt, jwtVerify } from 'jose';
import { NextApiRequest, NextPageContext } from 'next/dist/shared/lib/utils';
import { FronteggNextJSSession } from './types';
import { ParsedUrlQuery } from 'querystring';
import { fronteggRefreshTokenUrl } from '@frontegg/rest-api';

function rewriteCookieProperty(header: string | string[], config: any, property: string): string | string[] {
  if (Array.isArray(header)) {
    return header.map((headerElement) => {
      return rewriteCookieProperty(headerElement, config, property);
    }) as string[];
  }
  return header.replace(new RegExp('(;\\s*' + property + '=)([^;]+)', 'i'), (match, prefix, previousValue) => {
    let newValue;
    if (previousValue in config) {
      newValue = config[previousValue];
    } else if ('*' in config) {
      newValue = config['*'];
    } else {
      // no match, return previous value
      return match;
    }
    if (newValue) {
      // replace value
      return prefix + newValue;
    } else {
      // remove value
      return '';
    }
  });
}

export async function refreshToken(ctx: NextPageContext): Promise<FronteggNextJSSession | null> {
  try {
    const request = ctx.req!;
    const cookies = (request as NextApiRequest).cookies;
    const refreshTokenKey = `fe_refresh_${fronteggConfig.clientId}`.replace(/-/g, '');
    const cookieKey = Object.keys(cookies).find((cookie) => {
      return cookie.replace(/-/g, '') === refreshTokenKey;
    });
    if (cookieKey) {
      const response = await fetch(`${process.env.FRONTEGG_BASE_URL}/frontegg${fronteggRefreshTokenUrl}`, {
        method: 'POST',
        credentials: 'include',
        body: '{}',
        headers: {
          cookie: request.headers.cookie as string,
        },
      });
      if (response.ok) {
        const data = await response.text();
        const rewriteCookieDomainConfig = { [fronteggConfig.baseUrlHost]: fronteggConfig.cookieDomain };
        // @ts-ignore
        const cookieHeader = response.headers.raw()['set-cookie'];
        let newSetCookie = rewriteCookieProperty(cookieHeader, rewriteCookieDomainConfig, 'domain');
        const [session, decodedJwt] = await createSessionFromAccessToken(data);
        if (!session) {
          return null;
        }
        const isSecured = new URL(fronteggConfig.appUrl).protocol === 'https:';
        const cookieValue = cookie.serialize(fronteggConfig.cookieName, session, {
          expires: new Date(decodedJwt.exp * 1000),
          httpOnly: true,
          domain: fronteggConfig.cookieDomain,
          path: '/',
          sameSite: isSecured ? 'none' : undefined,
          secure: isSecured,
        });
        if (cookieValue.length > 4096) {
          console.error(
            `@frontegg/nextjs: Cookie length is too big ${cookieValue.length}, browsers will refuse it. Try to remove some data.`
          );
        }
        if (typeof newSetCookie === 'string') {
          newSetCookie = [newSetCookie];
        }
        newSetCookie.push(cookieValue);
        ctx.res?.setHeader('set-cookie', newSetCookie);
        return {
          accessToken: JSON.parse(data).accessToken,
          user: decodedJwt,
        };
      } else {
        // refresh token failed
      }
    }
    return null;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export function addToCookies(cookieValue: string, res: ServerResponse) {
  let existingSetCookie = (res.getHeader('set-cookie') as string[] | string) ?? [];
  if (typeof existingSetCookie === 'string') {
    existingSetCookie = [existingSetCookie];
  }
  res.setHeader('set-cookie', [...existingSetCookie, cookieValue]);
}

export function removeCookies(cookieName: string, isSecured: boolean, cookieDomain: string, res: ServerResponse) {
  const cookieValue = cookie.serialize(cookieName, '', {
    expires: new Date(),
    httpOnly: true,
    domain: cookieDomain,
    path: '/',
    sameSite: isSecured ? 'none' : 'lax',
    secure: isSecured,
  });
  let existingSetCookie = (res.getHeader('set-cookie') as string[] | string) ?? [];
  if (typeof existingSetCookie === 'string') {
    existingSetCookie = [existingSetCookie];
  }
  res.setHeader('set-cookie', [...existingSetCookie, cookieValue]);
}

export async function createSessionFromAccessToken(output: string): Promise<[string, any] | []> {
  const { accessToken } = JSON.parse(output);
  const decodedJwt: any = decodeJwt(accessToken);
  const session = await sealData(accessToken, {
    password: fronteggConfig.passwordsAsMap,
    ttl: decodedJwt.exp,
  });
  return [session, decodedJwt];
}

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

export const modifySetCookieIfUnsecure = (
  setCookieValue: string[] | undefined,
  isSecured: boolean
): string[] | undefined => {
  if (!setCookieValue) {
    return setCookieValue;
  }
  if (setCookieValue.length > 0) {
    return setCookieValue.map((c) => {
      const cookie = c.split('; ');
      if (isSecured) {
        return c;
      }
      return cookie.filter((property) => property !== 'Secure' && property !== 'SameSite=None').join('; ');
    });
  }
  return setCookieValue;
};
