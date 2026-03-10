import type { ComputedRef, InjectionKey, Ref } from "vue";

export interface AccordionContext {
  activeKeys: Ref<readonly string[]>;
  toggle: (key: string) => void;
}

export const accordionKey = Symbol(
  "accordion",
) as InjectionKey<AccordionContext>;

export const formGroupErrorIdKey = Symbol("formGroupErrorId") as InjectionKey<
  ComputedRef<string | undefined>
>;

export const formGroupHintIdKey = Symbol("formGroupHintId") as InjectionKey<
  ComputedRef<string | undefined>
>;
