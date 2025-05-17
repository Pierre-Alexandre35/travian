/// <reference types="react" />
/**
 * A React context that provides access to a SimpleFormIterator item meta (its index and the total number of items) and mutators (reorder and remove this remove).
 * Useful to create custom array input iterators.
 * @see {SimpleFormIterator}
 * @see {ArrayInput}
 */
export declare const SimpleFormIteratorItemContext: import("react").Context<SimpleFormIteratorItemContextValue>;
export declare type SimpleFormIteratorItemContextValue = {
    index: number;
    total: number;
    remove: () => void;
    reOrder: (newIndex: number) => void;
};
//# sourceMappingURL=SimpleFormIteratorItemContext.d.ts.map