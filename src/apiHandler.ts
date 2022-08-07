import { fetchWithTimeout } from './fetchWithTimeout';

// APIからデータ取得
export const getApiData = async (url: string) => {
  return await (await fetchWithTimeout(url)).json();
};
