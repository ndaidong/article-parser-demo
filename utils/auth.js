// utils -> auth

import {genid, md5} from 'bellajs';

export const getCredentials = () => {
  return {
    clientId: genid(32),
    clientSecret: genid(24),
  };
};


export const verify = (clientId, clientSecret, credentials) => {
  if (!clientId || !clientSecret) {
    return false;
  }
  const cred = md5([clientId, clientSecret].join('-'));
  return credentials === cred;
};
