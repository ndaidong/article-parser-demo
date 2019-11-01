// helpers -> loader

const API_BASE_URL = '/api/extract';

export default async (url) => {
  const target = `${API_BASE_URL}?url=${encodeURIComponent(url)}`;
  const data = await fetch(target);
  return data.json();
};
