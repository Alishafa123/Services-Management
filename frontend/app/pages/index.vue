<template>
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem;">
    <div style="width: 100%; max-width: 550px;">
      <div style="text-align: center; margin-bottom: 2rem;">
        <h1 style="font-size: 2.5rem; font-weight: bold; color: white; margin-bottom: 0.5rem;">Create Account</h1>
        <p style="color: rgba(255, 255, 255, 0.9); font-size: 1rem;">Join us today and get started</p>
      </div>

      <UCard style="box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); border-radius: 1rem; padding: 2rem;">
        <UForm :state="form" @submit="onSubmit">
          <div style="margin-bottom: 1.5rem;">
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; font-size: 0.875rem;">Full Name</label>
            <UInput 
              v-model="form.name" 
              placeholder="John Doe" 
              size="xl"
              style="width: 100%;"
            />
          </div>

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
            Create Account
          </UButton>
        </UForm>

 

        
      </UCard>


    </div>
  </div>
</template>

<script setup lang="ts">
const form = ref({
  name: '',
  email: '',
  password: '',
})

const loading = ref(false)
const toast = useToast()
const { signup } = useAuth()

const onSubmit = async () => {
  loading.value = true
  try {
    await signup(form.value)
    toast.add({
      title: 'Success',
      description: 'Account created successfully!',
      color: 'green',
    })
    navigateTo('/dashboard')
  } catch (error: any) {
    toast.add({
      title: 'Error',
      description: error.message || 'Failed to create account',
      color: 'red',
    })
  } finally {
    loading.value = false
  }
}
</script>
