// config

import {
  existsSync,
  mkdirSync,
} from 'fs';

import {
  genid,
  clone,
  md5,
} from 'bellajs';

import {
  warning,
} from '../utils/logger';

const cacheTime = 3600;

const staticOpt = {
  maxAge: cacheTime * 1000,
  etag: true,
  lastModified: true,
};

const fileStoreOpt = {
  path: 'storage/sessions',
  keyFunction: (secret, sessionId) => {
    return md5([secret, sessionId].join('-'));
  },
};

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

(() => {
  if (!existsSync(fileStoreOpt.path)) {
    mkdirSync(fileStoreOpt.path, {recursive: true});
  }
})();

let config = {
  ENV: env.ENV || 'dev',
  host: env.HOST || '0.0.0.0',
  port: env.PORT || 7214,
  url: 'http://0.0.0.0:7214',
  baseDir: './',
  srcDir: './src',
  distDir: './dist',
  staticOpt,
  fileStoreOpt,
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

