import { ContextOptions } from '../interfaces';
export default class ContextHolder {
    private static instance;
    private context;
    private constructor();
    static getInstance(): ContextHolder;
    setContext(context: ContextOptions): void;
    getContext(): ContextOptions;
}
