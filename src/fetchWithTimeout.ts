export const fetchWithTimeout = async (url: string, object: Object) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => {
    controller.abort();
  }, 10000);

  try {
    const method = "POST";
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json;charset=utf8",
    };
    const body = JSON.stringify(object);
    const response = await fetch(url, {
      method,
      headers,
      body,
      signal: controller.signal,
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response;
  } finally {
    clearTimeout(timeout);
  }
};
