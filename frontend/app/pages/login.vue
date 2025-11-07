<template>
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem;">
    <div style="width: 100%; max-width: 550px;">
      <div style="text-align: center; margin-bottom: 2rem;">
        <h1 style="font-size: 2.5rem; font-weight: bold; color: white; margin-bottom: 0.5rem;">Welcome Back</h1>
        <p style="color: rgba(255, 255, 255, 0.9); font-size: 1rem;">Sign in to your account</p>
      </div>

      <UCard style="box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); border-radius: 1rem; padding: 2rem;">
        <UForm :state="form" @submit="onSubmit">
          <div style="margin-bottom: 1.5rem;">
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; font-size: 0.875rem;">Email Address</label>
            <UInput 
              v-model="form.email" 
              type="email" 
              placeholder="john@example.com" 
              size="xl"
              style="width: 100%;"
            />
          </div>

          <div style="margin-bottom: 1.5rem;">
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; font-size: 0.875rem;">Password</label>
            <UInput 
              v-model="form.password" 
              type="password" 
              placeholder="••••••••" 
              size="xl"
              style="width: 100%;"
            />
          </div>

          <UButton 
            type="submit" 
            block 
            size="xl"
            :loading="loading"
            color="primary"
            style="margin-top: 1rem; width: 100%; padding: 1rem;"
          >
            Sign In
          </UButton>
        </UForm>

        <div style="margin: 1.5rem 0; text-align: center; position: relative;">
          <div style="border-top: 1px solid #e5e7eb; position: absolute; width: 100%; top: 50%;"></div>
          <span style="background: white; padding: 0 1rem; position: relative; color: #6b7280; font-size: 0.875rem;">OR</span>
        </div>

        <div style="text-align: center;">
          <p style="font-size: 0.875rem; color: #6b7280;">
            Don't have an account?
            <UButton 
              variant="link" 
              @click="navigateTo('/')" 
              style="padding: 0; font-weight: 600;"
            >
              Create one now
            </UButton>
          </p>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
const form = ref({
  email: '',
  password: '',
})

const loading = ref(false)
const toast = useToast()
const { login } = useAuth()

const onSubmit = async () => {
  loading.value = true
  try {
    await login(form.value)
    toast.add({
      title: 'Success',
      description: 'Logged in successfully!',
      color: 'green',
    })
    navigateTo('/dashboard')
  } catch (error: any) {
    toast.add({
      title: 'Error',
      description: error.message || 'Failed to login',
      color: 'red',
    })
  } finally {
    loading.value = false
  }
}
</script>
