import httpProxy from 'http-proxy';
import { NextApiRequest, NextApiResponse } from 'next';
import fronteggConfig from './FronteggConfig';
import cookie from 'cookie';
import { addToCookies, createSessionFromAccessToken, modifySetCookieIfUnsecure, removeCookies } from './helpers';
import FronteggConfig from './FronteggConfig';
import { fronteggAuthApiRoutes } from '@frontegg/rest-api';

/**
 * @see https://www.npmjs.com/package/http-proxy
 */
const proxy = httpProxy.createProxyServer({
  target: process.env.FRONTEGG_BASE_URL,
});

/**
 * Please refer to the following links for the specification document for HTTP.
 * @see https://tools.ietf.org/html/rfc7231
 * @see https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol
 */
const hasRequestBodyMethods: string[] = ['HEAD', 'POST', 'PUT', 'DELETE', 'CONNECT', 'OPTIONS', 'PATCH'];

/**
 * If pattern information matching the input url information is found in the `pathRewrite` array,
 * the url value is partially replaced with the `pathRewrite.replaceStr` value.
 * @param url
 * @param pathRewrite
 */
export const rewritePath = (
  url: string,
  pathRewrite: { [key: string]: string } | { patternStr: string; replaceStr: string }[]
) => {
  if (Array.isArray(pathRewrite)) {
    for (const item of pathRewrite) {
      const { patternStr, replaceStr } = item;
      const pattern = RegExp(patternStr);
      if (pattern.test(url as string)) {
        return url.replace(pattern, replaceStr);
      }
    }
  } else {
    // tslint:disable-next-line:forin
    for (const patternStr in pathRewrite) {
      const pattern = RegExp(patternStr);
      const path = pathRewrite[patternStr];
      if (pattern.test(url as string)) {
        return url.replace(pattern, path);
      }
    }
  }
  return url;
};

/**
 * Next.js HTTP Proxy Middleware
 * @see https://nextjs.org/docs/api-routes/api-middlewares
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */
export function fronteggMiddleware(req: NextApiRequest, res: NextApiResponse): Promise<any> {
  return new Promise((resolve, reject) => {
    const pathRewrite = [
      {
        patternStr: '^/api/',
        replaceStr: '/',
      },
    ];
    if (pathRewrite) {
      req.url = rewritePath(req.url as string, pathRewrite);
    }

    if (hasRequestBodyMethods.indexOf(req.method as string) >= 0 && typeof req.body === 'object') {
      req.body = JSON.stringify(req.body);
    }
    const isSecured = new URL(FronteggConfig.appUrl).protocol === 'https:';

    proxy
      .once('proxyReq', (proxyReq: any, req: any): void => {
        if (hasRequestBodyMethods.indexOf(req.method as string) >= 0 && typeof req.body === 'string') {
          proxyReq.write(req.body);
          proxyReq.end();
        }
      })
      .once('proxyRes', (proxyRes, req, serverResponse) => {
        proxyRes.headers['set-cookie'] = modifySetCookieIfUnsecure(proxyRes.headers['set-cookie'], isSecured);
        const _end = res.end;
        let buffer = new Buffer('');
        proxyRes
          .on('data', (chunk) => {
            buffer = Buffer.concat([buffer, chunk]);
          })
          .on('end', async () => {
            const output = buffer.toString('utf-8');
            const isLogout = req?.url?.endsWith(
              fronteggAuthApiRoutes.find((path) => path.endsWith('/logout')) ?? '/logout'
            );
            if (isLogout) {
              removeCookies(fronteggConfig.cookieName, isSecured, fronteggConfig.cookieDomain, serverResponse);
            } else {
              const [session, decodedJwt] = await createSessionFromAccessToken(output);
              if (session) {
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
                addToCookies(cookieValue, serverResponse);
              }
            }
            res.setHeader('content-length', output.length);
            res.setHeader('content-encoding', '');
            // @ts-ignore
            _end.apply(res, [output]);
          });

        // disable default behavior to read jwt
        // @ts-ignore
        serverResponse.write = () => undefined;
        serverResponse.end = () => undefined;
      })
      .once('error', reject)
      .web(req, res, {
        changeOrigin: true,
        cookieDomainRewrite: { [fronteggConfig.baseUrlHost]: fronteggConfig.cookieDomain },
        // ...serverOptions
      });
  });
}
