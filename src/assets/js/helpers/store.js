// helpers -> store.js

const createStore = () => {
  const state = {
    title: 'Article Parser',
    author: '@ndaidong',
    authorLink: 'https://twitter.com/ndaidong',
    processing: false,
    article: {
      url: '',
      links: [],
      title: '',
      description: '',
      image: '',
      author: '',
      content: '',
      source: '',
      published: '',
    },
  };
  const init = async () => {
    return state;
  };

  return {
    init,
  };
};

export const Store = createStore();
