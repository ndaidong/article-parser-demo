// utils -> auth

import {genid, md5} from 'bellajs';
import LRU from 'lru-cache';

import {getConfig} from '../configs';

const config = getConfig();

const cache = new LRU({
  max: 5,
  maxAge: config.ENV === 'dev' ? 6e4 * 2 : 6e4 * 60 * 3,
});

const KEY = 'credentials';
const CLIENT_SECRET = genid(24);

const setCredentials = () => {
  const clientId = genid(32);
  const clientSecret = CLIENT_SECRET;
  const c = {
    clientId,
    clientSecret,
    credentials: md5([clientId, clientSecret].join('-')),
  };
  cache.set(KEY, c);
  return c;
};

export const getCredentials = () => {
  const c = cache.get(KEY);
  if (!c) {
    return setCredentials();
  }
  return c;
};


export const verify = (credentials) => {
  const c = getCredentials();
  return credentials === c.credentials;
};
