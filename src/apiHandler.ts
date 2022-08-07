import { fetchWithTimeout } from "./fetchWithTimeout";

// APIからデータ取得
export const postApiData = async (url: string, object: Object) => {
  return await (await fetchWithTimeout(url, object)).json();
};
