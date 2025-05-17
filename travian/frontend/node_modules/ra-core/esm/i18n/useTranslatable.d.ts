import { TranslatableContextValue } from './TranslatableContext';
/**
 * Hook supplying the logic to translate a field value in multiple languages.
 *
 * @param options The hook options
 * @param {string} options.defaultLocale The locale of the default selected locale. Defaults to 'en'.
 * @param {string[]} options.locales An array of the supported locales. Each is an object with a locale and a name property. For example { locale: 'en', name: 'English' }.
 *
 * @returns
 * An object with following properties and methods:
 * - selectedLocale: The locale of the currently selected locale
 * - locales: An array of the supported locales
 * - getLabel: A function which returns the translated label for the given field
 * - getSource: A function which returns the source for the given field
 * - selectLocale: A function which set the selected locale
 */
export declare const useTranslatable: (options: UseTranslatableOptions) => TranslatableContextValue;
export declare type UseTranslatableOptions = {
    defaultLocale?: string;
    locales: string[];
};
//# sourceMappingURL=useTranslatable.d.ts.map