import { writable } from 'svelte/store'

export const selectedIndexStore = writable(0)
export const themesStore = writable([
  {
    id: 1,
    name: 'default',
    edit: false,
    colors: [
      {
        value: '#fff',
        name: 'white',
      },
    ],
  },
])
