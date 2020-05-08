// helpers -> loader

const API_BASE_URL = 'https://us-central1-technews-251304.cloudfunctions.net/article-parser';


export const extract = async (url) => {
  try {
    const target = `${API_BASE_URL}?url=${encodeURIComponent(url)}`;
    const data = await fetch(target);
    return data.json();
  } catch (err) {
    console.trace(err);
  }
};

export default {
  extract,
};
