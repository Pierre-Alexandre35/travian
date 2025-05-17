import { useEffect } from 'react';
import useGetPermissions from './useGetPermissions';
import { useSafeSetState } from '../util/hooks';
var emptyParams = {};
/**
 * Hook for getting user permissions
 *
 * Calls the authProvider.getPermissions() method asynchronously.
 * If the authProvider returns a rejected promise, returns empty permissions.
 *
 * The return value updates according to the request state:
 *
 * - start: { loading: true, loaded: false }
 * - success: { permissions: [any], loading: false, loaded: true }
 * - error: { error: [error from provider], loading: false, loaded: true }
 *
 * Useful to enable features based on user permissions
 *
 * @param {Object} params Any params you want to pass to the authProvider
 *
 * @returns The current auth check state. Destructure as { permissions, error, loading, loaded }.
 *
 * @example
 *     import { usePermissions } from 'react-admin';
 *
 *     const PostDetail = props => {
 *         const { loaded, permissions } = usePermissions();
 *         if (loaded && permissions == 'editor') {
 *             return <PostEdit {...props} />
 *         } else {
 *             return <PostShow {...props} />
 *         }
 *     };
 */
var usePermissions = function (params) {
    if (params === void 0) { params = emptyParams; }
    var _a = useSafeSetState({
        loading: true,
        loaded: false,
    }), state = _a[0], setState = _a[1];
    var getPermissions = useGetPermissions();
    useEffect(function () {
        getPermissions(params)
            .then(function (permissions) {
            setState({ loading: false, loaded: true, permissions: permissions });
        })
            .catch(function (error) {
            setState({
                loading: false,
                loaded: true,
                error: error,
            });
        });
    }, [getPermissions, params, setState]);
    return state;
};
export default usePermissions;
