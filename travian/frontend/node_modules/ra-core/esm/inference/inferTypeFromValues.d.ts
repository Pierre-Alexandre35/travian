export declare const InferenceTypes: readonly ["array", "boolean", "date", "email", "id", "image", "number", "reference", "referenceChild", "referenceArray", "referenceArrayChild", "richText", "string", "url", "object"];
export declare type PossibleInferredElementTypes = typeof InferenceTypes[number];
export interface InferredElementDescription {
    type: PossibleInferredElementTypes;
    props?: any;
    children?: InferredElementDescription | InferredElementDescription[];
}
/**
 * Guesses an element type based on an array of values
 *
 * @example
 *     inferElementFromValues(
 *         'address',
 *         ['2 Baker Street', '1 Downing street'],
 *     );
 *     // { type: 'string', props: { source: 'address' } }
 *
 * @param {string} name Property name, e.g. 'date_of_birth'
 * @param {any[]} values an array of values from which to determine the type, e.g. [12, 34.4, 43]
 */
export declare const inferTypeFromValues: (name: any, values?: any[]) => InferredElementDescription;
//# sourceMappingURL=inferTypeFromValues.d.ts.map