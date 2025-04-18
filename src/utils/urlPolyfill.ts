import { URL as NodeURL, URLSearchParams as NodeURLSearchParams } from 'url';

// Export the URL and URLSearchParams from the 'url' package
export const URL = NodeURL;
export const URLSearchParams = NodeURLSearchParams;

// Add to global scope if needed
if (typeof window !== 'undefined') {
    if (!window.URL) {
        (window as any).URL = NodeURL;
    }
    if (!window.URLSearchParams) {
        (window as any).URLSearchParams = NodeURLSearchParams;
    }
}

export default {
    URL,
    URLSearchParams
}; 