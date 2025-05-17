import { combineReducers } from 'redux';
import oneToMany from './oneToMany';
import possibleValues, { getPossibleReferences as pvGetPossibleReferences, getPossibleReferenceValues as pvGetPossibleReferenceValues, } from './possibleValues';
var defaultReducer = function () { return null; };
export default combineReducers({
    /**
     * ts-jest does some aggressive module mocking when unit testing reducers individually.
     * To avoid 'No reducer provided for key "..."' warnings,
     * we pass default reducers. Sorry for legibility.
     *
     * @see https://stackoverflow.com/questions/43375079/redux-warning-only-appearing-in-tests
     */
    oneToMany: oneToMany || defaultReducer,
    possibleValues: possibleValues || defaultReducer,
});
export var getPossibleReferenceValues = function (state, props) {
    return pvGetPossibleReferenceValues(state.possibleValues, props);
};
export var getPossibleReferences = pvGetPossibleReferences;
