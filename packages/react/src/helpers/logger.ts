import log from 'loglevel';

const logger = log.noConflict();

logger.setLevel(process.env.FRONTEGG_DEBUG_LEVEL || 'error');

// logger.enableAll();

export default class Logger {
  public static log(message: string | number | Array<any> | Object, ...meta: any[]) {
    logger.debug(message, meta);
  }

  public static debug(message: string | number | Array<any> | Object, ...meta: any[]) {
    logger.debug(message, meta);
  }

  public static info(message: string | number | Array<any> | Object, ...meta: any[]) {
    logger.info(message, meta);
  }

  public static warn(message: string | number | Array<any> | Object, ...meta: any[]) {
    logger.warn(message, meta);
  }

  public static error(message: string | number | Array<any> | Object, ...meta: any[]) {
    logger.error(message, meta);
  }
}
