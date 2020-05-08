// start

import {execSync} from 'child_process';
import {readdir, statSync, existsSync} from 'fs';
import {extname} from 'path';

import {getConfig} from './configs';
import {error} from './utils/logger';
import release from './utils/release';

const extName = '.html';

const isFile = (f) => {
  const stats = statSync(f);
  return !stats.isDirectory();
};

const isTplFile = (f) => {
  return extname(f) === extName;
};

const build = () => {
  const conf = getConfig();
  const {srcDir, distDir, staticDir} = conf;
  if (existsSync(distDir)) {
    execSync(`rm -rf ${distDir}`);
    execSync(`mkdir ${distDir}`);
  }
  execSync(`cp -r ${staticDir}/. ${distDir}`);
  execSync(`mkdir -p ${distDir}/assets/css`);
  execSync(`mkdir -p ${distDir}/assets/js`);

  readdir(srcDir, 'utf8', (err, files) => {
    if (err) {
      error(err);
    }
    files.forEach((file) => {
      const f = `${srcDir}/${file}`;
      if (isFile(f) && isTplFile(f)) {
        return release(f, srcDir, distDir, extName);
      }
    });
  });
};

build();
