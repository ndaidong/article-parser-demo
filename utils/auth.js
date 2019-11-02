// utils -> auth

import {genid, md5} from 'bellajs';
import LRU from 'lru-cache';

const cache = new LRU({
  max: 1,
  maxAge: 6e4 * 2,
});

const KEY = 'credentials';

const setCredentials = () => {
  const c = {
    clientId: genid(16),
    clientSecret: genid(24),
  };
  cache.set(KEY, c);
  return c;
};

export const getCredentials = () => {
  const credentials = cache.get(KEY);
  return credentials || setCredentials();
};

export const verify = (apikey) => {
  const cred = getCredentials();
  console.log(cred);
  console.log('apikey', apikey);
  const {clientId, clientSecret} = cred;
  const credential = md5([clientId, clientSecret].join('-'));
  console.log('credential', credential);
  return credential === apikey;
};
