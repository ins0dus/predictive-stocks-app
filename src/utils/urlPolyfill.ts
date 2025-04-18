// Custom URL polyfill implementation
declare global {
  interface Window {
    URL: typeof URL;
  }
}

if (typeof window !== 'undefined' && !window.URL) {
  class URLPolyfill {
    private url: string;
    private protocol: string;
    private hostname: string;
    private pathname: string;
    private search: string;
    private hash: string;

    constructor(url: string, base?: string) {
      this.url = url;
      if (base) {
        const baseUrl = new URL(base);
        this.protocol = baseUrl.protocol;
        this.hostname = baseUrl.hostname;
        this.pathname = baseUrl.pathname;
        this.search = baseUrl.search;
        this.hash = baseUrl.hash;
      } else {
        const match = url.match(/^([^:]+):\/\/([^/]+)(\/[^?#]*)?(\?[^#]*)?(#.*)?$/);
        if (match) {
          this.protocol = match[1] + ':';
          this.hostname = match[2];
          this.pathname = match[3] || '/';
          this.search = match[4] || '';
          this.hash = match[5] || '';
        } else {
          throw new TypeError('Invalid URL');
        }
      }
    }

    toString(): string {
      return this.url;
    }
  }

  window.URL = URLPolyfill as any;
}

export const initializeURLPolyfill = () => {
  // This function is exported to make the file a module
  return true;
}; 