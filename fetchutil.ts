type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

interface FetchOptions<TRequestBody> extends Omit<RequestInit, 'body' | 'method'> {
  method?: HttpMethod
  headers?: Record<string, string>
  body?: TRequestBody
  params?: Record<string, string>
}

interface FetchConfig {
  baseUrl: string
  defaultHeaders?: Record<string, string>
}

class HttpError extends Error {
  constructor(public response: Response, message?: string) {
    super(message)
    this.name = 'HttpError'
  }
}

export const createFetchUtil = (config: FetchConfig) => {
  const { baseUrl, defaultHeaders = {} } = config

  const fetchUtil = async <TResponse, TRequestBody = unknown>(
    endpoint: string,
    options: FetchOptions<TRequestBody> = {}
  ): Promise<TResponse> => {
    const {
      method = 'GET',
      headers = {},
      body,
      params,
      ...restOptions
    } = options

    const url = new URL(endpoint, baseUrl)

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value)
      })
    }

    const mergedHeaders = {
      'Content-Type': 'application/json',
      ...defaultHeaders,
      ...headers,
    }

    const fetchOptions: RequestInit = {
      method,
      headers: mergedHeaders,
      ...restOptions,
    }

    if (body) {
      fetchOptions.body = JSON.stringify(body)
    }

    const response = await fetch(url.toString(), fetchOptions)

    if (!response.ok) {
      throw new HttpError(response, `HTTP error! status: ${response.status}`)
    }

    // Parse JSON response if the content type is JSON
    const contentType = response.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      return response.json() as Promise<TResponse>
    }

    return response.text() as unknown as TResponse
  }

  return fetchUtil
}

// Helper function to add authorization header
export const withAuth = (token: string): Record<string, string> => ({
  Authorization: `Bearer ${token}`,
})
