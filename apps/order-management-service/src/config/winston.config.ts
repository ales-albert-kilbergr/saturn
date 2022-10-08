import { registerAs } from '@nestjs/config';
import * as chalk from 'chalk';
import * as logform from 'logform';
import { WinstonModuleOptions } from 'nest-winston';
import * as util from 'util';
import * as winston from 'winston';
import { environment } from '../environments/environment';

function parseDate(timestamp: string) {
  const now = new Date(timestamp);
  const cMonth = `0${now.getMonth() + 1}`.slice(-2);
  const cDate = `0${now.getDate()}`.slice(-2);
  const cHours = `0${now.getHours()}`.slice(-2);
  const cMinutes = `0${now.getMinutes()}`.slice(-2);
  const cSeconds = `0${now.getSeconds()}`.slice(-2);

  return (
    `${cMonth}/${cDate}/${now.getFullYear()} ` +
    `${cHours}:${cMinutes}:${cSeconds}.${now.getMilliseconds()}`
  );
}

function parseMessage(message: any) {
  if (typeof message === 'object') {
    return util.inspect(message, false, null, true /* enable colors */);
  } else {
    return message;
  }
}

function parseStack(stack = '') {
  return chalk`{dim ${stack}}`;
}

export const winstonConfig = registerAs('winstonConfig', () => {
  const config: WinstonModuleOptions = {
    defaultMeta: { label: 'IAM Api' },
  };

  let formatter: logform.Format;

  if (environment.production) {
    formatter = winston.format.json();
  } else {
    formatter = winston.format.combine(
      winston.format.errors({ stack: true }),
      winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.printf((info) => {
        return (
          chalk`{cyan [${info.label}] {yellow ${process.pid}} -}  ` +
          chalk`{dim ${parseDate(info.timestamp)}: }` +
          chalk`${info.level} {yellow [${info.context}]} ` +
          chalk` {green ${parseMessage(info.message)}}${parseStack(info.stack)}`
        );
      })
    );
  }

  config.transports = [
    new winston.transports.Console({
      level: environment.logLevel,
      handleExceptions: true,
      format: formatter,
    }),
  ];
  return config;
});
