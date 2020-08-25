export default class Logger {
    private readonly module;
    private constructor();
    static from: (module: string) => Logger;
    private _log;
    debug: any;
    info: any;
    warn: any;
    error: any;
}
