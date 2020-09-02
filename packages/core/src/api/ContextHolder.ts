import { ContextOptions } from '../interfaces';

export class ContextHolder {
  private static instance: ContextHolder;
  private context: ContextOptions | null = null;
  private accessToken: string | null = null;

  private constructor() { }

  private static getInstance(): ContextHolder {
    if (!ContextHolder.instance) {
      ContextHolder.instance = new ContextHolder();
    }

    return ContextHolder.instance;
  }

  public static setContext(context: ContextOptions) {
    ContextHolder.getInstance().context = context;
  }


  public static getContext(): ContextOptions {
    return ContextHolder.getInstance().context ?? {
      baseUrl: window.location.href,
      tokenResolver: () => 'my-authentication-token',
    };
  }

  public static setAccessToken(accessToken: string | null) {
    ContextHolder.getInstance().accessToken = accessToken;
  }

  public static getAccessToken(): string | null {
    return ContextHolder.getInstance().accessToken;
  }
}
