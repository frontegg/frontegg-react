import { IUserProfile } from './teams/interfaces';
import { ContextOptions, RedirectOptions } from './interfaces';

export class ContextHolder {
  private static instance: ContextHolder;
  private context: ContextOptions | null = null;
  private accessToken: string | null = null;
  private user: IUserProfile | null = null;
  private onRedirectTo: (path: string, opts?: RedirectOptions) => void = (path) => (window.location.href = path);
  private logout: (callback?: () => void) => void = () => (window.location.href = '/account/logout');

  private constructor() {}

  static getInstance(): ContextHolder {
    if (!ContextHolder.instance) {
      ContextHolder.instance = new ContextHolder();
    }

    return ContextHolder.instance;
  }

  public static setContext(context: ContextOptions) {
    ContextHolder.getInstance().context = context;
  }

  public static setAccessToken(accessToken: string | null) {
    ContextHolder.getInstance().accessToken = accessToken;
  }

  public static setUser(user: IUserProfile | null) {
    ContextHolder.getInstance().user = user;
  }

  public static setOnRedirectTo(onRedirectTo: (path: string, opts?: RedirectOptions) => void) {
    ContextHolder.getInstance().onRedirectTo = onRedirectTo;
  }

  public static setLogout(logout: (callback?: () => void) => void, logoutUrl: string) {
    ContextHolder.getInstance().logout = (callback?: () => void) => {
      if (!callback) {
        ContextHolder.onRedirectTo(logoutUrl);
      } else {
        logout(callback);
      }
    };
  }

  public static getContext(): ContextOptions {
    return (
      ContextHolder.getInstance().context ?? {
        baseUrl: window.location.href,
        tokenResolver: () => 'my-authentication-token',
        logLevel: 'error',
      }
    );
  }

  public static getAccessToken(): string | null {
    return ContextHolder.getInstance().accessToken;
  }

  public static getUser(): IUserProfile | null {
    return ContextHolder.getInstance().user;
  }

  public static onRedirectTo(path: string, opts?: RedirectOptions) {
    return ContextHolder.getInstance().onRedirectTo(path, opts);
  }

  public static logout(callback?: () => void) {
    return ContextHolder.getInstance().logout(callback);
  }
}

export const FronteggContext = {
  getContext: (): ContextOptions => ContextHolder.getContext(),
  getAccessToken: (): string | null => ContextHolder.getAccessToken(),
  getUser: (): IUserProfile | null => ContextHolder.getUser(),
  onRedirectTo: (path: string, opts: RedirectOptions) => ContextHolder.onRedirectTo(path, opts),
  logout: (callback?: () => void) => ContextHolder.logout(callback),
};
