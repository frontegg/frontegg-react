import { ContextOptions } from '../interfaces';

export default class ContextHolder {
  private static instance: ContextHolder;
  private context: ContextOptions | null = null;

  private constructor() { }

  public static getInstance(): ContextHolder {
    if (!ContextHolder.instance) {
      ContextHolder.instance = new ContextHolder();
    }

    return ContextHolder.instance;
  }

  public setContext(context: ContextOptions) {
    this.context = context;
  }

  public getContext(): ContextOptions {
    return this.context ?? {
      baseUrl: window.location.href,
      tokenResolver: () => 'my-authentication-token',
    };
  }
}
