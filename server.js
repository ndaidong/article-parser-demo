// server.js

import {normalize} from 'path';
import {existsSync} from 'fs';

import {isString} from 'bellajs';
import express from 'express';
import cookieParser from 'cookie-parser';

import {getConfig} from './configs';


import readFile from './utils/readFile';
import parseJS from './utils/parseJS';
import parseCSS from './utils/parseCSS';
import parseHTML from './utils/parseHTML';

import {getCredentials} from './utils/auth';
import {info, error} from './utils/logger';

import handleRequest from './handlers/extractor';

const {
  baseDir,
  srcDir,
  staticOpt,
  port,
} = getConfig();

const app = express();

app.use(cookieParser());

app.set('etag', 'strong');
app.disable('x-powered-by');

const staticDir = normalize(`${baseDir}/${srcDir}/static`);
if (existsSync(staticDir)) {
  app.use(express.static(staticDir, staticOpt));
}

app.get('/api/extract', (req, res) => {
  return handleRequest(req, res);
});

app.get('/assets/*', async (req, res, next) => {
  const filePath = req.params[0];
  if (filePath.endsWith('.js')) {
    const jsContent = await parseJS(filePath);
    if (jsContent && isString(jsContent)) {
      res.type('text/javascript');
      return res.send(jsContent);
    }
  } else if (filePath.endsWith('.css')) {
    const cssContent = await parseCSS(filePath);
    if (cssContent && isString(cssContent)) {
      res.type('text/css');
      return res.send(cssContent);
    }
  }
  error(`Error while loading file '${filePath}'`);
  return next();
});

app.get('/', (req, res) => {
  const {clientId} = getCredentials();
  const html = readFile(`${baseDir}/${srcDir}/index.html`);
  res.type('text/html');
  res.cookie('clientId', clientId);
  res.send(parseHTML(html));
});

app.listen(port, () => {
  info(`Server started at http://0.0.0.0:${port}`);
});
