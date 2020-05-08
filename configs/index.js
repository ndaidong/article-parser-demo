// config

import {
  genid,
  clone,
} from 'bellajs';

import {
  warning,
} from '../utils/logger';

const env = process.env || {}; // eslint-disable-line no-process-env

[
  'ENV',
  'HOST',
  'PORT',
].forEach((envar) => {
  if (!env[envar]) {
    warning(`Environment variable ${envar} is missing`);
  }
});

const siteUrl = env.ENV === 'prod' ?
  'https://article-parser-demo.ctdtmnhnlcndt.com' :
  'http://0.0.0.0:7214';

let config = {
  ENV: env.ENV || 'dev',
  host: env.HOST || '0.0.0.0',
  port: env.PORT || 7214,
  url: siteUrl,
  baseDir: './',
  srcDir: './src',
  distDir: './docs',
  staticDir: './src/static',
  rev: genid(40),
};


export const configure = (conf = {}) => {
  const {
    url = '',
    host = '',
    port = '',
  } = conf;

  if (!url && host && port) {
    conf.url = `http://${host}:${port}`;
  }

  config = Object.assign(config, clone(conf));
  return config;
};

export const getConfig = () => {
  return clone(config);
};

