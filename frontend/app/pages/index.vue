<template>
  <div class="main-container">
    <div class="login-container">
      <div class="title">Signup Form</div>
      <Form @submit="onSubmit" :validation-schema="schema">

        <div class="form-group">
          <label for="name">Name</label>
          <Field name="name" type="text" placeholder="Enter your name" />
          <ErrorMessage name="name" class="error" />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <Field name="email" type="email" placeholder="Enter your email" />
          <ErrorMessage name="email" class="error" />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <Field
            name="password"
            type="password"
            placeholder="Enter your password"
          />
          <ErrorMessage name="password" class="error" />
        </div>

        <button type="submit" :disabled="loading">
          {{ loading ? 'Submitting...' : 'Sign Up' }}
        </button>
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import { useAuth } from '~/composables/useAuth'

const loading = ref(false)
const { signup } = useAuth()

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
})

const onSubmit = async (values: { name: string; email: string; password: string }) => {
  loading.value = true
  try {
    await signup(values)
    navigateTo('/profile')
  } catch (error: any) {
    console.error('Signup failed:', error.message || error)
  } finally {
    loading.value = false
  }
}
</script>

<style>
html,
body,
#app {
  height: 100%;
  margin: 0;
  font-family: Arial, sans-serif;
}

.main-container {
  height: 100vh;
  width: 100vw;
  background-color:#d5e6f7;

  display: flex;
  justify-content: center;
  align-items: center;  
}

.login-container {
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  width: 320px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-align: center;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

label {
  margin-bottom: 0.5rem;
  font-weight: 500;
}

input {
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

input:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #4f46e5;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;
}

button:disabled {
  background-color: #a5b4fc;
  cursor: not-allowed;
}

.error {
  color: red;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
</style>
