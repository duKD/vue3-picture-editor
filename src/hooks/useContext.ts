import { InjectionKey, provide, inject } from "vue";

export function createProvider<T>(
  key: InjectionKey<T> = Symbol(),
  context: any
) {
  provide(key, context);
}

export function getInject<T>(key: InjectionKey<T>, native?: boolean): T;
export function getInject<T>(
  key: InjectionKey<T> = Symbol(),
  defaultValue?: any
): T {
  return inject(key, defaultValue || {});
}
