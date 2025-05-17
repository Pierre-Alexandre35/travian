import { createContext } from 'react';
var defaultIdentity = { id: '' };
var defaultProvider = {
    login: function () { return Promise.resolve(); },
    logout: function () { return Promise.resolve(); },
    checkAuth: function () { return Promise.resolve(); },
    checkError: function () { return Promise.resolve(); },
    getPermissions: function () { return Promise.resolve(); },
    getIdentity: function () { return Promise.resolve(defaultIdentity); },
};
var AuthContext = createContext(defaultProvider);
AuthContext.displayName = 'AuthContext';
export default AuthContext;
