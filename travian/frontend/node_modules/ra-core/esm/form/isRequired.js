var isRequired = function (validate) {
    if (validate && validate.isRequired) {
        return true;
    }
    if (Array.isArray(validate)) {
        return validate.some(function (it) { return it.isRequired; });
    }
    return false;
};
export default isRequired;
