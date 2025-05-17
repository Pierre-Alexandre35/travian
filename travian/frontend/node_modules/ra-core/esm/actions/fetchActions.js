export var FETCH_START = 'RA/FETCH_START';
export var fetchStart = function () { return ({ type: FETCH_START }); };
export var FETCH_END = 'RA/FETCH_END';
export var fetchEnd = function () { return ({ type: FETCH_END }); };
export var FETCH_ERROR = 'RA/FETCH_ERROR';
export var fetchError = function () { return ({ type: FETCH_ERROR }); };
export var FETCH_CANCEL = 'RA/FETCH_CANCEL';
export var fetchCancel = function () { return ({ type: FETCH_CANCEL }); };
