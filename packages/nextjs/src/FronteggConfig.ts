import { importJWK, KeyLike } from 'jose';

export type PasswordsMap = { [id: string]: string };
export type Password = string | PasswordsMap;

export function normalizeStringPasswordToMap(password: Password) {
  return typeof password === 'string' ? { 1: password } : password;
}

class FronteggConfig {
  private readonly _cookieName: string;
  private readonly _password: string;
  private _jwtPublicKey: KeyLike | Uint8Array | undefined;
  private readonly _passwordsAsMap: PasswordsMap;
  private readonly _clientId: string;

  constructor() {
    this._cookieName = process.env.FRONTEGG_COOKIE_NAME ?? 'frontegg-session';
    this._password = process.env.FRONTEGG_ENCRYPTION_PASSWORD ?? '';
    this._passwordsAsMap = normalizeStringPasswordToMap(this._password);
    this._clientId = process.env.FRONTEGG_CLIENT_ID ?? '';
  }

  get cookieName(): string {
    return this._cookieName;
  }

  get password(): string {
    return this._password;
  }

  get clientId(): string {
    return this._clientId;
  }

  get baseUrlHost(): string {
    return new URL(process.env.FRONTEGG_BASE_URL ?? '').hostname;
  }

  get appUrl(): string {
    return process.env.FRONTEGG_APP_URL ?? 'http://localhost:3000';
  }

  get cookieDomain(): string {
    return new URL(process.env.FRONTEGG_APP_URL ?? '').hostname.replace(/:(\d)+$/, '');
  }

  async getJwtPublicKey(): Promise<KeyLike | Uint8Array> {
    if (!this._jwtPublicKey) {
      const response = await fetch(`${process.env.FRONTEGG_BASE_URL}/.well-known/jwks.json`);
      const data = await response.json();
      const publicKey = data.keys.find((key: any) => key.kty === 'RSA');
      this._jwtPublicKey = await importJWK(publicKey);
    }
    return this._jwtPublicKey;
  }

  get passwordsAsMap(): PasswordsMap {
    return this._passwordsAsMap;
  }
}

export default new FronteggConfig();
