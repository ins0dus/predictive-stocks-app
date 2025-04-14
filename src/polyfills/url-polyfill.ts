declare module 'url' {
  export class URLSearchParams {
    constructor(init?: string | Record<string, string> | URLSearchParams | string[][] | undefined);
    append(name: string, value: string): void;
    delete(name: string): void;
    get(name: string): string | null;
    getAll(name: string): string[];
    has(name: string): boolean;
    set(name: string, value: string): void;
    sort(): void;
    toString(): string;
    entries(): IterableIterator<[string, string]>;
    keys(): IterableIterator<string>;
    values(): IterableIterator<string>;
    [Symbol.iterator](): IterableIterator<[string, string]>;
    readonly size: number;
  }
}

// URLSearchParams polyfill for older browsers
if (typeof URLSearchParams === 'undefined') {
  class URLSearchParamsPolyfill {
    private params: Map<string, string[]>;

    constructor(init?: string | Record<string, string> | URLSearchParams | string[][] | undefined) {
      this.params = new Map<string, string[]>();

      if (init) {
        if (typeof init === 'string') {
          this.parseString(init);
        } else if (init instanceof URLSearchParams) {
          this.parseURLSearchParams(init);
        } else if (Array.isArray(init)) {
          this.parseArray(init);
        } else if (typeof init === 'object') {
          this.parseObject(init);
        }
      }
    }

    private parseString(str: string): void {
      const pairs = str.split('&');
      for (const pair of pairs) {
        const [key, value] = pair.split('=');
        if (key) {
          this.append(key, value || '');
        }
      }
    }

    private parseURLSearchParams(params: URLSearchParams): void {
      for (const [key, value] of params.entries()) {
        this.append(key, value);
      }
    }

    private parseArray(arr: string[][]): void {
      for (const [key, value] of arr) {
        this.append(key, value);
      }
    }

    private parseObject(obj: Record<string, string>): void {
      for (const [key, value] of Object.entries(obj)) {
        this.append(key, value);
      }
    }

    append(name: string, value: string): void {
      const values = this.params.get(name) || [];
      values.push(value);
      this.params.set(name, values);
    }

    delete(name: string): void {
      this.params.delete(name);
    }

    get(name: string): string | null {
      const values = this.params.get(name);
      return values ? values[0] : null;
    }

    getAll(name: string): string[] {
      return this.params.get(name) || [];
    }

    has(name: string): boolean {
      return this.params.has(name);
    }

    set(name: string, value: string): void {
      this.params.set(name, [value]);
    }

    sort(): void {
      const sorted = new Map([...this.params.entries()].sort());
      this.params = sorted;
    }

    toString(): string {
      const pairs: string[] = [];
      for (const [key, values] of this.params.entries()) {
        for (const value of values) {
          pairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
        }
      }
      return pairs.join('&');
    }

    *entries(): IterableIterator<[string, string]> {
      for (const [key, values] of this.params.entries()) {
        for (const value of values) {
          yield [key, value];
        }
      }
    }

    *keys(): IterableIterator<string> {
      for (const key of this.params.keys()) {
        yield key;
      }
    }

    *values(): IterableIterator<string> {
      for (const values of this.params.values()) {
        for (const value of values) {
          yield value;
        }
      }
    }

    [Symbol.iterator](): IterableIterator<[string, string]> {
      return this.entries();
    }

    get size(): number {
      return this.params.size;
    }
  }

  // Assign the polyfill to the global URLSearchParams
  (window as any).URLSearchParams = URLSearchParamsPolyfill;
} 