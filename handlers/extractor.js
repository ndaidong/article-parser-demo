// handlers -> extractor

import {extract} from 'article-parser';

import {verify} from '../utils/auth';
import {trackFailedExtraction} from '../utils/tracker';
import {info, error} from '../utils/logger';

import {getConfig} from '../configs';

const getArticleFrom = async (url = '') => {
  info(`Start extracting article from "${url}"`);

  const result = {
    error: 1,
    article: null,
  };
  try {
    const article = await extract(url);
    if (article) {
      result.error = 0;
      result.article = article;
    } else {
      result.errorType = 'parser';
      result.message = 'Could not extract article from this url!';
    }
  } catch (err) {
    error(err);
    result.error = 1;
    result.errorType = 'parser';
    result.message = 'Extracting failed!';
    const {ENV} = getConfig();
    if (ENV === 'prod') {
      trackFailedExtraction(url, err.message || 'Unknown error');
    }
  }
  return result;
};


export default async (req, res) => {
  const {url = ''} = req.query;
  const credentials = req.get('credentials');
  if (verify(credentials)) {
    const result = await getArticleFrom(url);
    return res.json(result);
  }
  return res.json({
    error: 1,
    errorType: 'credentials',
    message: 'Credentials are missing or invalid!',
  });
};
