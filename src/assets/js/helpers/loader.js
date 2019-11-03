// helpers -> loader

import {md5} from 'bellajs';

const API_BASE_URL = '/api/extract';

const getCookie = (name) => {
  const v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return v ? v[2] : null;
};

export const extract = async (url, clientSecret) => {
  try {
    const clientId = getCookie('clientId');
    const credentials = md5([clientId, clientSecret].join('-'));
    console.log('clientId', clientId);
    console.log('clientSecret', clientSecret);
    console.log('credentials', credentials);
    const target = `${API_BASE_URL}?url=${encodeURIComponent(url)}`;
    const data = await fetch(target, {
      headers: {
        credentials,
      },
    });
    return data.json();
  } catch (err) {
    console.trace(err);
  }
};

export default {
  extract,
};
