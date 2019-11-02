// helpers -> store.js

import {clone} from 'bellajs';

const createStore = () => {
  const emptyArticle = {
    url: '',
    links: [],
    title: '',
    description: '',
    image: '',
    author: '',
    content: '',
    source: '',
    published: '',
  };

  const state = {
    title: 'Article Parser',
    author: '@ndaidong',
    authorLink: 'https://twitter.com/ndaidong',
    clientSecret: '__clientSecret__',
    article: clone(emptyArticle),
  };


  const setArticle = (article) => {
    state.article = article;
  };

  const unsetArticle = () => {
    state.article = clone(emptyArticle);
  };

  const getState = () => {
    return state;
  };

  const init = async () => {
    unsetArticle();
    return getState();
  };

  return {
    init,
    setArticle,
    unsetArticle,
    getState,
  };
};

export default createStore();
