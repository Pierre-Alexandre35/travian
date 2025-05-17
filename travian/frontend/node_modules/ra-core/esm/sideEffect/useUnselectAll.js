import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setListSelectedIds } from '../actions';
import { warning } from '../util';
/**
 * Hook for Unselect All Side Effect
 *
 * @example
 *
 * const unselectAll = useUnselectAll('posts');
 * unselectAll();
 */
var useUnselectAll = function (resource1) {
    var dispatch = useDispatch();
    return useCallback(function (resource2) {
        warning(!resource2 && !resource1, "You didn't specify the resource at initialization (useUnselectAll('posts')) nor when using the callback (unselectAll('posts'))");
        dispatch(setListSelectedIds(resource2 || resource1, []));
    }, [dispatch, resource1]);
};
export default useUnselectAll;
