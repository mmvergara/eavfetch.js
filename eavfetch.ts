const API_URL = "http://localhost:3000";

type EavReturn<Data> = [Data | undefined, string | undefined];

async function eavFetch<T>(
  method: string,
  url: string,
  data?: Record<string, any> | FormData,
  options: RequestInit = {}
): Promise<EavReturn<T>> {
  try {
    const fetchOptions: RequestInit = {
      method,
      credentials: "include", // you can override this in the options
      ...options,
    };

    if (data) {
      fetchOptions.body =
        data instanceof FormData ? data : JSON.stringify(data);
      if (!(data instanceof FormData)) {
        fetchOptions.headers = {
          "Content-Type": "application/json",
          ...options.headers,
        };
      }
    }
    console.log(fetchOptions);
    const reqUrl = `${API_URL}${url}`;
    const response = await fetch(reqUrl, fetchOptions);

    if (!response.ok) {
      return [undefined, await response.text()];
    }

    // Check if no content
    if (response.status === 204) {
      return [undefined, undefined];
    }
    // Add more different status codes handling here if needed

    const result = await response.json();
    return [result.data, undefined];
  } catch (error) {
    return [undefined, (error as Error).message];
  }
}

const post = <T = undefined>(
  url: string,
  data: Record<string, any> | FormData,
  options?: RequestInit
) => eavFetch<T>("POST", url, data, options);

const get = <T>(url: string, options?: RequestInit) =>
  eavFetch<T>("GET", url, undefined, options);

const del = <T>(url: string, options?: RequestInit) =>
  eavFetch<T>("DELETE", url, undefined, options);

const put = <T>(
  url: string,
  data: Record<string, any> | FormData,
  options?: RequestInit
) => eavFetch<T>("PUT", url, data, options);

const patch = <T>(
  url: string,
  data: Record<string, any> | FormData,
  options?: RequestInit
) => eavFetch<T>("PATCH", url, data, options);

export { post, get, del, put, patch };
