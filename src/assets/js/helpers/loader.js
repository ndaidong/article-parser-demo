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
    const credential = md5([clientId, clientSecret].join('-'));
    const target = `${API_BASE_URL}?url=${encodeURIComponent(url)}`;
    const data = await fetch(target, {
      headers: {
        ApiKey: credential,
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
