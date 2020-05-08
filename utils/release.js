
import path from 'path';
import {normalize} from 'path';

import {load} from 'cheerio';

import isAbsoluteURL from './isAbsoluteURL';
import readFile from './readFile';
import parseCSS from './parseCSS';
import parseJS from './parseJS';
import writeFile from './writeFile';

import {info} from './logger';

const releaseCSS = async (fpath, srcDir, distDir) => {
  const cssFileName = path.basename(fpath);
  const distPath = normalize(`${distDir}/assets/css/${cssFileName}`);
  info(`Parsing CSS file "${cssFileName}"`);
  const cssContent = await parseCSS(`css/${cssFileName}`);
  writeFile(distPath, cssContent);
  info(`Release CSS file to "${distPath}"`);
};

const releasJS = async (fpath, srcDir, distDir) => {
  const jsFileName = path.basename(fpath);
  const distPath = normalize(`${distDir}/assets/js/${jsFileName}`);
  info(`Parsing JS file "${jsFileName}"`);
  const jsContent = await parseJS(`js/${jsFileName}`);
  writeFile(distPath, jsContent);
  info(`Release JS file to "${distPath}"`);
};

export default async (tplFile, srcDir, distDir) => {
  info(`Parsing HTML file "${tplFile}"`);
  const filename = path.basename(tplFile, '.html');
  const content = readFile(tplFile);
  const $ = load(content, {
    normalizeWhitespace: true,
  });

  $('link[rel="stylesheet"]').each((k, el) => {
    const $el = $(el);
    const href = $el.attr('href') || '';
    if (href && !isAbsoluteURL(href)) {
      releaseCSS(href, srcDir, distDir);
    }
  });

  $('script').each((k, el) => {
    const $el = $(el);
    const href = $el.attr('src') || '';
    if (href && !isAbsoluteURL(href)) {
      releasJS(href, srcDir, distDir);
    }
  });
  const htmlFilePath = normalize(`${distDir}/${filename}.html`);
  writeFile(htmlFilePath, content);
  info(`Release HTML file to "${htmlFilePath}"`);
};
