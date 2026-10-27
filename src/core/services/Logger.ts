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

class Logger {
  static __log(color: string, stylePrefixedText: string, data: unknown[]) {
    if (__DEV__) {
      const now = new Date();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const milliseconds = String(now.getMilliseconds()).padStart(2, '0');

      const timeStamp = `[${minutes}:${seconds}:${milliseconds}]`;

      return console.log(
        timeStamp,
        stylePrefixedText,
        data.length ? '=> ' : '',
        ...(data || []),
      );
    }
  }

  static error(text = 'Hello world', ...data: unknown[]) {
    this.__log(consoleStyles.error, `🆘[ERROR]\t ${text}`, data);
  }

  static warn(text = 'Hello world', ...data: unknown[]) {
    this.__log(consoleStyles.warn, `[WARN]\t ${text}`, data);
  }

  static info(text = 'Hello world', ...data: unknown[]) {
    this.__log(consoleStyles.info, `[INFO]\t ${text}`, data);
  }

  static success(text = 'Hello world', ...data: unknown[]) {
    this.__log(consoleStyles.success, `✅[SUCCESS]\t ${text}`, data);
  }

  static requestStart(text = 'Hello world', ...data: unknown[]) {
    this.__log(consoleStyles['api-success'], `➡️ [API START]\t ${text}`, data);
  }

  static requestSuccess(text = 'Hello world', ...data: unknown[]) {
    this.__log(consoleStyles['api-success'], `✅[API SUCCESS]\t ${text}`, data);
  }

  static requestError(text = 'Hello world', ...data: unknown[]) {
    this.__log(consoleStyles['api-error'], `🆘[API ERROR]\t ${text}`, data);
  }

  static complited(text = 'Hello world', ...data: unknown[]) {
    this.__log(consoleStyles.complited, `✅[COMPLITED]\t ${text}`, data);
  }

  static custom(tag = 'CUSTOM', text = 'Hello world', ...data: unknown[]) {
    this.__log(consoleStyles.info, `[${tag.toUpperCase()}]\t ${text}`, data);
  }

  static log(text = 'Hello world', ...data: unknown[]) {
    this.__log(consoleStyles.default, text, data);
  }
}

export default Logger;
