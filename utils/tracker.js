// utils -> tracker

import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
  appendFileSync,
} from 'fs';

import {format} from 'bellajs';

import {send} from './mailer';

const TRACKING_DIR = 'storage/tracking';
const TRACKING_FILE = `${TRACKING_DIR}/failed-extraction.csv`;

const savedUrls = new Set();

(() => {
  if (!existsSync(TRACKING_DIR)) {
    mkdirSync(TRACKING_DIR, {recursive: true});
  }
  if (!existsSync(TRACKING_FILE)) {
    writeFileSync(
      TRACKING_FILE,
      [
        'Date',
        'URL',
        'Error',
        '\n',
      ].join(', '),
      'utf8'
    );
  } else {
    const txt = readFileSync(TRACKING_FILE, 'utf8');
    const lines = txt.split('\n');
    if (lines.length > 1) {
      lines.shift();
      lines.forEach((line) => {
        const cells = line.split(',');
        if (cells.length > 1) {
          const url = cells[1];
          savedUrls.add(url);
        }
      });
    }
  }
})();

export const trackFailedExtraction = (url, msgErr) => {
  if (!savedUrls.has(url)) {
    const dt = format((new Date()).getTime(), 'Y/m/d h:i:s');
    appendFileSync(
      TRACKING_FILE,
      [
        dt,
        url,
        msgErr,
        '\n',
      ].join(','),
      'utf8'
    );
    send([
      'Hello Sir.',
      'We could not extract article from the following URL:',
      url,
      `Error: ${msgErr}`,
      'Please take a look into this problem!<br>Best regards.',
      'Your bot',
    ].join('<br><br>'));
  }
};


