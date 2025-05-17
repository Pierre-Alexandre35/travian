import get from 'lodash/get';
export var canReplyWithCache = function (type, payload, resourceState) {
    var now = new Date();
    switch (type) {
        case 'getList':
            return (get(resourceState, [
                'list',
                'cachedRequests',
                JSON.stringify(payload),
                'validity',
            ]) > now);
        case 'getOne':
            return (resourceState &&
                resourceState.validity &&
                resourceState.validity[payload.id] > now);
        case 'getMany':
            return (resourceState &&
                resourceState.validity &&
                payload.ids.every(function (id) { return resourceState.validity[id] > now; }));
        default:
            return false;
    }
};
export var getResultFromCache = function (type, payload, resourceState) {
    switch (type) {
        case 'getList': {
            var data_1 = resourceState.data;
            var requestSignature = JSON.stringify(payload);
            var cachedRequest = resourceState.list.cachedRequests[requestSignature];
            return {
                data: cachedRequest.ids.map(function (id) { return data_1[id]; }),
                total: cachedRequest.total,
            };
        }
        case 'getOne':
            return { data: resourceState.data[payload.id] };
        case 'getMany':
            return {
                data: payload.ids.map(function (id) { return resourceState.data[id]; }),
            };
        default:
            throw new Error('cannot reply with cache for this method');
    }
};
