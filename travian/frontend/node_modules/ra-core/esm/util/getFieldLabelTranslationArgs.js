import inflection from 'inflection';
/**
 * Returns an array of arguments to use with the translate function for the label of a field.
 * The label will be the one specified by the label prop or one computed from the resource and source props.
 *
 * Usage:
 *  <span>
 *      {translate(...getFieldLabelTranslationArgs({ label, resource, source }))}
 *  </span>
 */
export default (function (options) {
    if (!options) {
        return [''];
    }
    var label = options.label, resource = options.resource, source = options.source;
    return typeof label !== 'undefined'
        ? [label, { _: label }]
        : typeof source !== 'undefined'
            ? [
                "resources." + resource + ".fields." + source,
                {
                    _: inflection.transform(source, ['underscore', 'humanize']),
                },
            ]
            : [''];
});
