/// <reference types="react" />
export declare const TranslatableContext: import("react").Context<TranslatableContextValue>;
export interface TranslatableContextValue {
    getLabel: GetTranslatableLabel;
    getSource: GetTranslatableSource;
    locales: string[];
    selectedLocale: string;
    selectLocale: SelectTranslatableLocale;
}
export declare type GetTranslatableSource = (field: string, locale?: string) => string;
export declare type GetTranslatableLabel = (field: string, label?: string) => string;
export declare type SelectTranslatableLocale = (locale: string) => void;
//# sourceMappingURL=TranslatableContext.d.ts.map