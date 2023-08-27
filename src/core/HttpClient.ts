type RequestConfig = {
  headers?: Record<string, string>;
};

type HTTPMethod = (url: string, options?: unknown, config?: RequestConfig) => Promise<unknown>;

export class HttpClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = 'https://ya-praktikum.tech/api/v2';
  }

  private createRequest(method: string, url: string, data?: any, config?: RequestConfig) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url, true);

      const headers = config?.headers || {};

      xhr.setRequestHeader('Content-Type', 'application/json');
      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };
      xhr.withCredentials = true;
      xhr.responseType = 'json';
      xhr.onerror = () => reject(xhr.responseText);
      if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.send(data ? JSON.stringify(data) : null);
      }
    });
  }

  private addQueryString(url: string, params: any) {
    const queryString = Object.entries(params)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
    return `${url}?${queryString}`;
  }

  get: HTTPMethod = (path, params, config?: RequestConfig) => {
    const url = this.baseUrl + path;
    const queryStringUrl = params ? this.addQueryString(url, params) : url;
    return this.createRequest('GET', queryStringUrl, config);
  };

  post: HTTPMethod = (path, data, config?: RequestConfig) => {
    const url = this.baseUrl + path;
    return this.createRequest('POST', url, data, config);
  };

  put: HTTPMethod = (path, data, config?: RequestConfig) => {
    const url = this.baseUrl + path;
    return this.createRequest('PUT', url, data, config);
  };

  delete: HTTPMethod = (path) => {
    const url = this.baseUrl + path;
    return this.createRequest('DELETE', url);
  };
}
