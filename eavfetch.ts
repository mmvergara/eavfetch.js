type ApiResponse<T> = [T | undefined, string | undefined];

/**
 * Creates an API client with predefined HTTP methods
 *
 * Rules:
 *
 * 1. The server should always return `{data: any, error: string | null}`
 * 2. The request must start with a forward slash `api.get("/users")`
 *
 * Usage:
 * ```typescript
 * const [data, error] = await api.get<UserType>('/users');
 *
 * // error is a type of string | undefined
 * // data is a type of UserType | undefined
 *
 * if (data) {
 *   // Handle success
 * }
 * if (error) {
 *   // Handle error
 * }
 * ```
 */
const createApi = (baseUrl: string) => {
  const request = async <T>(
    method: string,
    path: string,
    body?: Record<string, any> | FormData
  ): Promise<ApiResponse<T>> => {
    try {
      const options: RequestInit = {
        method,
        credentials: "include",
        headers:
          body instanceof FormData
            ? {}
            : { "Content-Type": "application/json" },
      };

      if (body) {
        options.body = body instanceof FormData ? body : JSON.stringify(body);
      }

      const response = await fetch(`${baseUrl}${path}`, options);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "API request failed");
      }

      return [data, undefined];
    } catch (error) {
      return [undefined, (error as Error).message];
    }
  };

  return {
    /** GET request - for retrieving data */
    get: <T>(path: string) => request<T>("GET", path),

    /** POST request - for creating new resources */
    post: <T>(path: string, body: Record<string, any> | FormData) =>
      request<T>("POST", path, body),

    /** PUT request - for replacing resources */
    put: <T>(path: string, body: Record<string, any> | FormData) =>
      request<T>("PUT", path, body),

    /** PATCH request - for partial updates */
    patch: <T>(path: string, body: Record<string, any> | FormData) =>
      request<T>("PATCH", path, body),

    /** DELETE request - for removing resources */
    delete: <T>(path: string) => request<T>("DELETE", path),
  };
};

/**
 * Pre-configured API client for the backend server
 *
 * @example
 * // Fetch users
 * const [users, error] = await api.get<User[]>('/users');
 *
 * // Create user
 * const [newUser, error] = await api.post<User>('/users', { name: 'John' });
 *
 * // Upload file
 * const formData = new FormData();
 * formData.append('file', file);
 * const [result, error] = await api.post<UploadResponse>('/upload', formData);
 */
export const api = createApi(API_URL);
