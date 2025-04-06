import envConfig from "@/config";

export async function apiRequest<T>(
  endpoint: string,
  options: {
    method?: string;
    body?: any;
    headers?: Record<string, string>;
    next?: { revalidate?: number };
  } = {}
): Promise<T> {
  const normalizedEndpoint = endpoint.startsWith("/")
    ? endpoint
    : `/${endpoint}`;
  const url = `${envConfig.NEXT_PUBLIC_API_ENDPOINT}${normalizedEndpoint}`;

  const defaultHeaders = {
    ...(options.body instanceof FormData
      ? {}
      : { "Content-Type": "application/json" }),
  };

  const requestBody = options.body ? JSON.stringify(options.body) : undefined;

  const config: RequestInit = {
    method: options.method ?? "GET",
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    body: options.body instanceof FormData ? options.body : requestBody,
    next: options.next,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      return Promise.reject(data as Error);
    }

    return data;
  } catch (error) {
    console.error(`Lỗi khi gọi ${normalizedEndpoint}:`, error);
    throw new Error((error as Error).message);
  }
}
