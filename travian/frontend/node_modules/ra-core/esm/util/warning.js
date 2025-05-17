export default (function (condition, message) {
    if (condition && process.env.NODE_ENV !== 'production') {
        console.warn(message); // eslint-disable-line
    }
});
