import { stringify } from 'query-string';
export interface Options extends RequestInit {
    user?: {
        authenticated?: boolean;
        token?: string;
    };
}
export declare const createHeadersFromOptions: (options: Options) => Headers;
export declare const fetchJson: (url: any, options?: Options) => Promise<{
    status: number;
    headers: Headers;
    body: string;
    json: any;
}>;
export declare const queryParameters: typeof stringify;
export declare const flattenObject: (value: any, path?: any[]) => any;
//# sourceMappingURL=fetch.d.ts.map