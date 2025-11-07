<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <nav class="bg-white dark:bg-gray-800 shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          <h1 class="text-xl font-bold">Dashboard</h1>
          <div class="flex items-center gap-4">
            <span class="text-sm text-gray-600 dark:text-gray-400">
              Welcome, {{ user?.name }}
            </span>
            <UButton @click="handleLogout" color="red" variant="soft">
              Logout
            </UButton>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold">User Information</h2>
        </template>

        <div class="space-y-2">
          <p><strong>ID:</strong> {{ user?.id }}</p>
          <p><strong>Name:</strong> {{ user?.name }}</p>
          <p><strong>Email:</strong> {{ user?.email }}</p>
        </div>
      </UCard>
    </main>
  </div>
</template>

<script setup lang="ts">
const { user, logout } = useAuth()
const toast = useToast()

const handleLogout = async () => {
  logout()
  toast.add({
    title: 'Success',
    description: 'Logged out successfully!',
    color: 'green',
  })
  navigateTo('/')
}
</script>
