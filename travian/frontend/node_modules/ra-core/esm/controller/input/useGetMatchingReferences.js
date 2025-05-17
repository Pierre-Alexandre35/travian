import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { crudGetMatchingAccumulate } from '../../actions/accumulateActions';
import { useResourceContext } from '../../core';
import { getPossibleReferences, getPossibleReferenceValues, getReferenceResource, } from '../../reducer';
import { useDeepCompareEffect } from '../../util/hooks';
var defaultReferenceSource = function (resource, source) {
    return resource + "@" + source;
};
export default (function (props) {
    var reference = props.reference, _a = props.referenceSource, referenceSource = _a === void 0 ? defaultReferenceSource : _a, source = props.source, filter = props.filter, pagination = props.pagination, sort = props.sort, id = props.id;
    var resource = useResourceContext(props);
    var dispatch = useDispatch();
    useDeepCompareEffect(function () {
        dispatch(crudGetMatchingAccumulate(reference, referenceSource(resource, source), pagination, sort, filter));
    }, [
        dispatch,
        filter,
        reference,
        referenceSource,
        resource,
        source,
        pagination,
        sort,
    ]);
    var matchingReferences = useGetMatchingReferenceSelector({
        referenceSource: referenceSource,
        reference: reference,
        resource: resource,
        source: source,
        id: id,
    });
    if (!matchingReferences) {
        return {
            loading: true,
            error: null,
            matchingReferences: null,
        };
    }
    if (matchingReferences.error) {
        return {
            loading: false,
            matchingReferences: null,
            error: matchingReferences.error,
        };
    }
    return {
        loading: false,
        error: null,
        matchingReferences: matchingReferences,
    };
});
var useGetMatchingReferenceSelector = function (_a) {
    var referenceSource = _a.referenceSource, reference = _a.reference, resource = _a.resource, source = _a.source, id = _a.id;
    var getMatchingReferences = useCallback(function (state) {
        var referenceResource = getReferenceResource(state, {
            reference: reference,
        });
        if (
        // resources are registered
        Object.keys(state.admin.resources).length > 0 &&
            // no registered resource matching the reference
            !referenceResource) {
            throw new Error("Cannot fetch a reference to \"" + reference + "\" (unknown resource).\nYou must add <Resource name=\"" + reference + "\" /> as child of <Admin> to use \"" + reference + "\" in a reference");
        }
        var possibleValues = getPossibleReferenceValues(state, {
            referenceSource: referenceSource,
            resource: resource,
            source: source,
        });
        return getPossibleReferences(referenceResource, possibleValues, [
            id,
        ]);
    }, [referenceSource, reference, resource, source, id]);
    return useSelector(getMatchingReferences);
};
