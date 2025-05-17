/// <reference types="react" />
/**
 * Context allowing inputs to register to a specific group.
 * This enables other components in the group to access group properties such as its
 * validation (valid/invalid) or whether its inputs have been updated (dirty/pristine).
 *
 * This should only be used through a FormGroupContextProvider.
 */
export declare const FormGroupContext: import("react").Context<string>;
export declare type FormGroupContextValue = string;
//# sourceMappingURL=FormGroupContext.d.ts.map