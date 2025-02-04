// https://github.com/pmndrs/zustand/blob/main/docs/integrations/persisting-store-data.md#how-can-i-use-a-custom-storage-engine
// https://github.com/mrousavy/react-native-mmkv/blob/master/docs/WRAPPER_ZUSTAND_PERSIST_MIDDLEWARE.md
import { StateStorage } from "zustand/middleware"
import { MMKV } from "react-native-mmkv"

const storage = new MMKV()

export const MMKVStorage: StateStorage = {
  setItem: (name, value) => {
    return storage.set(name, value)
  },
  getItem: (name) => {
    const value = storage.getString(name)
    return value ?? null
  },
  removeItem: (name) => {
    return storage.delete(name)
  }
}

import { StoreApi, UseBoundStore } from "zustand"

type WithSelectors<S, T = unknown> = S extends { getState: () => infer R }
  ? (S & {
    use: {
      [K in keyof Required<R>]: () => R[K]
    } & (T extends CustomSelectors<R>
      ? { [K in keyof T]: () => ReturnType<T[K]> }
      : Record<string, never>
    )
  }) : never

type CustomSelectors<S> = Record<string, (store: S) => unknown>

export function createSelectors<S extends object>(_store: UseBoundStore<StoreApi<S>>): WithSelectors<UseBoundStore<StoreApi<S>>>
export function createSelectors<S extends object, T extends CustomSelectors<S>>(_store: UseBoundStore<StoreApi<S>>, customSelectors: T): WithSelectors<UseBoundStore<StoreApi<S>>, T>
export function createSelectors<S extends object, T extends CustomSelectors<S>>(
  _store: UseBoundStore<StoreApi<S>>, customSelectors?: T
): unknown {
  const store = _store as WithSelectors<UseBoundStore<StoreApi<S>>, T>
  (store.use as Record<string, () => unknown>) = {}

  // Add selector for store properties
  for (const k of Object.keys(store.getState())) {
    (store.use as Record<string, () => unknown>)[k] = (): unknown => store((s) => s[k as keyof typeof s])
  }

  // Register custom selectors
  for (const [k, selector] of Object.entries(customSelectors || {})) {
    (store.use as Record<string, () => unknown>)[k] = (): unknown => _store((s) => selector(s))
  }
  return store
}


/* export const getEncryptedStorage = async ({
  id,
  path,
  encryptionKey
}): Promise<MMKV> => {
  return new MMKV({
    id,
    path,
    encryptionKey
  })
}
 */
