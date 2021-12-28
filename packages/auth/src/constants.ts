import { v4 as uuid } from 'uuid';
import jwtEncode from 'jwt-encode';

export const FRONTEGG_AFTER_AUTH_REDIRECT_URL = 'FRONTEGG_AFTER_AUTH_REDIRECT_URL';
export const FRONTEGG_CODE_VERIFIER = 'FRONTEGG_CODE_VERIFIER';

const expiresIn = 365000;
const iat = new Date();
const expires = new Date(iat.getMilliseconds() + expiresIn);
const userId = uuid();
const aud = uuid();
const token = {
  sub: userId,
  name: 'Test User 1',
  email: 'test+1@frontegg.com',
  email_verified: true,
  roles: ['admin'],
  permissions: ['fe.*'],
  metadata: {},
  profilePictureUrl: '',
  tenantId: 'my-tenant-id',
  tenantIds: ['my-tenant-id'],
  type: 'userToken',
  iat: iat.getMilliseconds(),
  exp: expires.getMilliseconds(),
  aud,
  iss: 'https://test.frontegg.com',
};

export const refreshTokenResponse = {
  accessToken: jwtEncode(token, 'secret'),
  expires,
  expiresIn,
  refreshToken: '',
  mfaRequired: false,
};
