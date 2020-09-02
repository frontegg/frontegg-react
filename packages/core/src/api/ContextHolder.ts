import { ContextOptions } from '../interfaces';

export default class ContextHolder {
  private static instance: ContextHolder;
  private context: ContextOptions | null = null;

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
}
