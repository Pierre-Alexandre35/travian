import { useContext } from 'react';
import AuthContext from './AuthContext';
export var defaultAuthParams = {
    loginUrl: '/login',
    afterLoginUrl: '/',
};
/**
 * Get the authProvider stored in the context
 */
var useAuthProvider = function () { return useContext(AuthContext); };
export default useAuthProvider;
