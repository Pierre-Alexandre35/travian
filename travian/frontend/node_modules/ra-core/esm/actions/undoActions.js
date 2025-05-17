export var UNDOABLE = 'RA/UNDOABLE';
export var startUndoable = function (action) { return ({
    type: UNDOABLE,
    payload: { action: action },
}); };
export var UNDO = 'RA/UNDO';
export var undo = function () { return ({
    type: UNDO,
}); };
export var COMPLETE = 'RA/COMPLETE';
export var complete = function () { return ({
    type: COMPLETE,
}); };
export var START_OPTIMISTIC_MODE = 'RA/START_OPTIMISTIC_MODE';
export var startOptimisticMode = function () { return ({
    type: START_OPTIMISTIC_MODE,
}); };
export var STOP_OPTIMISTIC_MODE = 'RA/STOP_OPTIMISTIC_MODE';
export var stopOptimisticMode = function () { return ({
    type: STOP_OPTIMISTIC_MODE,
}); };
