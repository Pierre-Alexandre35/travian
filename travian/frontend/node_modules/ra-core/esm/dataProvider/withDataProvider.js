var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as React from 'react';
import useDataProviderWithDeclarativeSideEffects from './useDataProviderWithDeclarativeSideEffects';
/**
 * Higher-order component for fetching the dataProvider
 *
 * Injects a dataProvider object, which behaves just like the real dataProvider
 * (same methods returning a Promise). But it's actually a Proxy object, which
 * dispatches Redux actions along the process. The benefit is that react-admin
 * tracks the loading state when using this hook, and stores results in the
 * Redux store for future use.
 *
 * In addition to the 2 usual parameters of the dataProvider methods (resource,
 * payload), the Proxy supports a third parameter for every call. It's an
 * object literal which may contain side effects, or make the action optimistic
 * (with undoable: true).
 *
 * @see useDataProvider
 *
 * @example
 *
 * import { withDataProvider, showNotification } from 'react-admin';
 *
 * class PostList extends Component {
 *     state = {
 *         posts: [],
 *     }
 *
 *     componentDidMount() {
 *         const { dataProvider, dispatch } = this.props;
 *         dataProvider.getList('posts', { filter: { status: 'pending' }})
 *            .then(({ data: posts }) => this.setState({ posts }))
 *            .catch(error => dispatch(showNotification(error.message, 'error')))
 *     }
 *
 *     render() {
 *         const { posts } = this.state;
 *         return (
 *            <Fragment>
 *                {posts.map((post, key) => <PostDetail post={post} key={key} />)}
 *            </Fragment>
 *         );
 *     }
 * }
 *
 * PostList.propTypes = {
 *     dataProvider: PropTypes.func.isRequired,
 * };
 *
 * export default withDataProvider(PostList);
 */
var withDataProvider = function (Component) { return function (props) { return (React.createElement(Component, __assign({}, props, { dataProvider: useDataProviderWithDeclarativeSideEffects() }))); }; };
export default withDataProvider;
