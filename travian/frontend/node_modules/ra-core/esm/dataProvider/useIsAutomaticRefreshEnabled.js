import { useSelector } from 'react-redux';
var useIsAutomaticRefreshEnabled = function () {
    var automaticRefreshEnabled = useSelector(function (state) { return state.admin.ui.automaticRefreshEnabled; });
    return automaticRefreshEnabled;
};
export default useIsAutomaticRefreshEnabled;
