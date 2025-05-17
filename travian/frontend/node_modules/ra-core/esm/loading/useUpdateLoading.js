import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { fetchStart, fetchEnd } from '../actions/fetchActions';
/**
 * Update the loading count, which starts or stops the loading indicator.
 *
 * To be used to show the loading indicator when you don't use the dataProvider.
 *
 * @return {Object} startLoading and stopLoading callbacks
 *
 * @example
 * import { useUpdateLoading } from 'react-admin'
 *
 * const MyComponent = () => {
 *      const { startLoading, stopLoading } = useUpdateLoading();
 *      useEffect(() => {
 *          startLoading();
 *          fetch('http://my.domain.api/foo')
 *              .finally(() => stopLoading());
 *      }, []);
 *      return <span>Foo</span>;
 * }
 */
export default (function () {
    var dispatch = useDispatch();
    var startLoading = useCallback(function () {
        dispatch(fetchStart());
    }, [dispatch]);
    var stopLoading = useCallback(function () {
        dispatch(fetchEnd());
    }, [dispatch]);
    return { startLoading: startLoading, stopLoading: stopLoading };
});
