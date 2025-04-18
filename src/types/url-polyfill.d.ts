declare module 'url' {
    export class URL {
        constructor(url: string, base?: string);
        hash: string;
        host: string;
        hostname: string;
        href: string;
        origin: string;
        password: string;
        pathname: string;
        port: string;
        protocol: string;
        search: string;
        searchParams: URLSearchParams;
        username: string;
        toString(): string;
        toJSON(): string;
    }

    export class URLSearchParams {
        constructor(init?: string | string[][] | Record<string, string> | URLSearchParams);
        append(name: string, value: string): void;
        delete(name: string): void;
        get(name: string): string | null;
        getAll(name: string): string[];
        has(name: string): boolean;
        set(name: string, value: string): void;
        sort(): void;
        toString(): string;
        forEach(callback: (value: string, name: string, searchParams: URLSearchParams) => void): void;
    }
} 