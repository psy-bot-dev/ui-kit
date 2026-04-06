/**
 * Type shim for useI18n — provided by vue-i18n at runtime.
 * Consumers must have vue-i18n or @nuxtjs/i18n configured.
 */
declare function useI18n(): {
  t: (key: string) => string;
};
