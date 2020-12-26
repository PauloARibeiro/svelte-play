import { writable } from 'svelte/store'

export const shouldAnimateStore = writable(false)
export const selectedIndexStore = writable(0)
export const themesStore = writable([
  {
    id: 1,
    name: 'default',
    edit: false,
    colors: [
      {
        value: '#000',
        name: 'white',
      },
    ],
  },
])
