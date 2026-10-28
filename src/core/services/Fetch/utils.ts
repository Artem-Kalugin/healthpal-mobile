export const fetchWithTimeout = async (
  url: string,
  options: RequestInit,
  timeout = 20000,
): Promise<Response> => {
  let timer: ReturnType<typeof setTimeout> | undefined;

  try {
    return await Promise.race([
      fetch(url, options),
      new Promise<Response>((_, reject) => {
        timer = setTimeout(() => reject(new Error('Request timeout')), timeout);
      }),
    ]);
  } finally {
    clearTimeout(timer);
  }
};
