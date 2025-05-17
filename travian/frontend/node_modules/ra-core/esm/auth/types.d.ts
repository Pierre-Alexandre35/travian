export declare type UserCheck = (payload: object, pathName: string, routeParams?: object) => void;
export declare const AUTH_LOGIN = "AUTH_LOGIN";
export declare const AUTH_CHECK = "AUTH_CHECK";
export declare const AUTH_ERROR = "AUTH_ERROR";
export declare const AUTH_LOGOUT = "AUTH_LOGOUT";
export declare const AUTH_GET_PERMISSIONS = "AUTH_GET_PERMISSIONS";
export declare type AuthActionType = typeof AUTH_LOGIN | typeof AUTH_LOGOUT | typeof AUTH_ERROR | typeof AUTH_CHECK | typeof AUTH_GET_PERMISSIONS;
//# sourceMappingURL=types.d.ts.map