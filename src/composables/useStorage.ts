import type { MaybeRefOrGetter } from 'vue'
import { Storage } from '@ionic/storage'
import { type StorageLikeAsync, useStorageAsync, type UseStorageAsyncOptions } from '@vueuse/core'

function createStorageAdapter(): StorageLikeAsync {
  const storage = new Storage().create()

  return {
    getItem: async (key: string) => (await storage).get(key),
    setItem: async (key: string, value: string) => (await storage).set(key, value),
    removeItem: async (key: string) => (await storage).remove(key),
  }
}

export default function useStorage<T>(key: string, initialValue: MaybeRefOrGetter<T>, options?: UseStorageAsyncOptions<T>) {
  return useStorageAsync(key, initialValue, createStorageAdapter(), {
    ...options,
    listenToStorageChanges: false,
  })
}
