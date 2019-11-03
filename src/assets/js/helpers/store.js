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
    overlayMessage: '',
    parserMessage: '',
    article: clone(emptyArticle),
  };


  const setArticle = (article) => {
    state.article = article;
    return state;
  };

  const unsetArticle = () => {
    state.parserMessage = '';
    state.article = clone(emptyArticle);
    return state;
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
    setOverlayMessage: (txt) => {
      state.overlayMessage = txt;
      return state;
    },
    setParserMessage: (txt) => {
      state.parserMessage = txt;
      return state;
    },
    setArticle,
    unsetArticle,
    getState,
  };
};

export default createStore();
