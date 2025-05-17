declare class HttpError extends Error {
    readonly message: any;
    readonly status: any;
    readonly body: any;
    constructor(message: any, status: any, body?: any);
}
export default HttpError;
//# sourceMappingURL=HttpError.d.ts.map