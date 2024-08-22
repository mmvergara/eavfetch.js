const API_URL = "http://localhost:3000";

async function eavFetch(method, url, data, options = {}) {
  try {
    const fetchOptions = {
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
    return [undefined, error.message];
  }
}

const post = (url, data, options) => eavFetch("POST", url, data, options);

const get = (url, options) => eavFetch("GET", url, undefined, options);

const del = (url, options) => eavFetch("DELETE", url, undefined, options);

const put = (url, data, options) => eavFetch("PUT", url, data, options);

const patch = (url, data, options) => eavFetch("PATCH", url, data, options);

export { post, get, del, put, patch };
