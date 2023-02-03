type HTTPMethod = (url: string, options?: unknown) => Promise<unknown>;

export class HttpClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private createRequest(method: string, url: string, data?: any) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(xhr.responseText);
        }
      };
      xhr.onerror = () => reject(xhr.responseText);
      xhr.send(data ? JSON.stringify(data) : null);
    });
  }

  private addQueryString(url: string, params: any) {
    const queryString = Object.entries(params)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
    return `${url}?${queryString}`;
  }

  get: HTTPMethod = (path, params?) => {
    const url = this.baseUrl + path;
    const queryStringUrl = params ? this.addQueryString(url, params) : url;
    return this.createRequest('GET', queryStringUrl);
  };

  post: HTTPMethod = (path, data?) => {
    const url = this.baseUrl + path;
    return this.createRequest('POST', url, data);
  };

  put: HTTPMethod = (path, data?) => {
    const url = this.baseUrl + path;
    return this.createRequest('PUT', url, data);
  };

  delete: HTTPMethod = (path) => {
    const url = this.baseUrl + path;
    return this.createRequest('DELETE', url);
  };
}
