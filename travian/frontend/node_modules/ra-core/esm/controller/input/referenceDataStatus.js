var isMatchingReferencesError = function (matchingReferences) {
    return matchingReferences && matchingReferences.error !== undefined;
};
export var getStatusForInput = function (_a) {
    var input = _a.input, matchingReferences = _a.matchingReferences, referenceRecord = _a.referenceRecord, _b = _a.translate, translate = _b === void 0 ? function (x) { return x; } : _b;
    var matchingReferencesError = isMatchingReferencesError(matchingReferences)
        ? translate(matchingReferences.error, {
            _: matchingReferences.error,
        })
        : null;
    var selectedReferenceError = input.value && !referenceRecord
        ? translate('ra.input.references.single_missing', {
            _: 'ra.input.references.single_missing',
        })
        : null;
    return {
        waiting: (input.value && selectedReferenceError && !matchingReferences) ||
            (!input.value && !matchingReferences),
        error: (input.value &&
            selectedReferenceError &&
            matchingReferencesError) ||
            (!input.value && matchingReferencesError)
            ? input.value
                ? selectedReferenceError
                : matchingReferencesError
            : null,
        warning: selectedReferenceError || matchingReferencesError,
        choices: Array.isArray(matchingReferences)
            ? matchingReferences
            : [referenceRecord].filter(function (choice) { return choice; }),
    };
};
export var REFERENCES_STATUS_READY = 'REFERENCES_STATUS_READY';
export var REFERENCES_STATUS_INCOMPLETE = 'REFERENCES_STATUS_INCOMPLETE';
export var REFERENCES_STATUS_EMPTY = 'REFERENCES_STATUS_EMPTY';
export var getSelectedReferencesStatus = function (input, referenceRecords) {
    return !input.value || input.value.length === referenceRecords.length
        ? REFERENCES_STATUS_READY
        : referenceRecords.length > 0
            ? REFERENCES_STATUS_INCOMPLETE
            : REFERENCES_STATUS_EMPTY;
};
export var getStatusForArrayInput = function (_a) {
    var input = _a.input, matchingReferences = _a.matchingReferences, referenceRecords = _a.referenceRecords, _b = _a.translate, translate = _b === void 0 ? function (x) { return x; } : _b;
    // selectedReferencesDataStatus can be "empty" (no data was found for references from input.value)
    // or "incomplete" (Not all of the reference data was found)
    // or "ready" (all references data was found or there is no references from input.value)
    var selectedReferencesDataStatus = getSelectedReferencesStatus(input, referenceRecords);
    var matchingReferencesError = isMatchingReferencesError(matchingReferences)
        ? translate(matchingReferences.error, {
            _: matchingReferences.error,
        })
        : null;
    return {
        waiting: (!matchingReferences &&
            input.value &&
            selectedReferencesDataStatus === REFERENCES_STATUS_EMPTY) ||
            (!matchingReferences && !input.value),
        error: matchingReferencesError &&
            (!input.value ||
                (input.value &&
                    selectedReferencesDataStatus === REFERENCES_STATUS_EMPTY))
            ? translate('ra.input.references.all_missing', {
                _: 'ra.input.references.all_missing',
            })
            : null,
        warning: matchingReferencesError ||
            (input.value &&
                selectedReferencesDataStatus !== REFERENCES_STATUS_READY)
            ? matchingReferencesError ||
                translate('ra.input.references.many_missing', {
                    _: 'ra.input.references.many_missing',
                })
            : null,
        choices: Array.isArray(matchingReferences)
            ? matchingReferences
            : referenceRecords,
    };
};
