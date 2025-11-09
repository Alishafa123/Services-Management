import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as null | { id: string; name: string; email: string },
  }),
  actions: {
    setUser(userData: { id: string; name: string; email: string }) {
      this.user = userData
    },
    clearUser() {
      this.user = null
    },
  },
})
