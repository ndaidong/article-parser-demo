// handlers -> extractor

import {extract} from 'article-parser';

import {info, error} from '../utils/logger';


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
      result.message = `Failed while extrcting article from "${url}"`;
    }
  } catch (err) {
    error(err);
    result.error = err;
  }
  return result;
};


export default async (req, res) => {
  const {url = ''} = req.query;
  const result = await getArticleFrom(url);
  return res.json(result);
};
