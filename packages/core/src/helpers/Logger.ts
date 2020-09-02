// @ts-ignore
const debugging = process.env.NODE_ENV === 'development';
// tslint:disable-next-line:no-empty
const emptyFunction = () => {};

export default class Logger {
  private constructor(private readonly module: string) {}

  static from = (module: string) => new Logger(module);
  private _log = ((l: string, prefix: string) => {
    // tslint:disable-next-line:no-console
    if (console.log.bind === undefined) {
      // @ts-ignore
      return Function.prototype.bind.call(console[l], console, prefix || '', this.module, ':');
    } else {
      // @ts-ignore
      return console[l].bind(console, prefix || '', this.module, ':');
    }
  });
  debug = debugging ? this._log('log', 'DEBUG |') : emptyFunction;
  info = debugging ? this._log('log', 'INFO  |') : emptyFunction;
  warn = this._log('warn', 'WARN  |');
  error = this._log('error', 'ERROR |');
}
