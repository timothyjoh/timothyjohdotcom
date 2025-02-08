import { persistentAtom } from '@nanostores/persistent'
export { atom } from 'nanostores'
export { useStore } from '@nanostores/react'

export const JSON_ENCODER = {
  encode: JSON.stringify,
  decode: JSON.parse,
}

export const atomLocal = <T>(key: string, init: T) => persistentAtom<T>(key, init, JSON_ENCODER)
