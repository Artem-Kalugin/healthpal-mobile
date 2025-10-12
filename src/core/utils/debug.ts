const consoleStyles = {
  default: 'color: Orchid;',
  info: 'color: SkyBlue;',
  warn: 'color: Khaki;',
  error: 'color: red;',
  'api-success': 'color: PaleGreen;',
  'api-error': 'color: red;',
  cloud: 'color: LightSkyBlue;',
  complited: 'color: PaleGreen;',
  success: 'color: PaleGreen;',
};

class Debug {
  static __log(color: any, stylePrefixedText: string, data: any) {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      return console.log(
        // '%c%s',
        // color,
        stylePrefixedText,
        data ? '=> ' : '',
        data || '',
      );
    }
  }

  static error(text = 'Hello world', data?: any) {
    this.__log(consoleStyles.error, `🆘[ERROR] ${text}`, data);
  }

  static warn(text = 'Hello world', data?: any) {
    this.__log(consoleStyles.warn, `[WARN] ${text}`, data);
  }

  static info(text = 'Hello world', data?: any) {
    this.__log(consoleStyles.info, `[INFO] ${text}`, data);
  }

  static success(text = 'Hello world', data?: any) {
    this.__log(consoleStyles.success, `✅[SUCCESS] ${text}`, data);
  }

  static requestStart(text = 'Hello world', data?: any) {
    this.__log(consoleStyles['api-success'], ` ℹ️[API START] ${text}`, data);
  }

  static requestSuccess(text = 'Hello world', data?: any) {
    this.__log(consoleStyles['api-success'], `✅[API SUCCESS] ${text}`, data);
  }

  static requestError(text = 'Hello world', data?: any) {
    this.__log(consoleStyles['api-error'], `🆘[API ERROR] ${text}`, data);
  }

  static complited(text = 'Hello world', data?: any) {
    this.__log(consoleStyles.complited, `✅[COMPLITED] ${text}`, data);
  }

  static log(text = 'Hello world', data?: any) {
    this.__log(consoleStyles.default, text, data);
  }
}

export default Debug;
