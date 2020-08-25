import { ContextOptions } from '../interfaces';
export declare const Get: (context: ContextOptions, url: string, params?: any, responseType?: any) => Promise<any>;
export declare const Post: (context: ContextOptions, url: string, body?: any, params?: any, responseType?: any) => Promise<any>;
export declare const Patch: (context: ContextOptions, url: string, body?: any, params?: any, responseType?: any) => Promise<any>;
export declare const Put: (context: ContextOptions, url: string, body?: any, params?: any, responseType?: any) => Promise<any>;
export declare const Delete: (context: ContextOptions, url: string, body?: any, params?: any, responseType?: any) => Promise<any>;
export declare const Download: (context: ContextOptions, url: string, body?: any, params?: any) => Promise<any>;
