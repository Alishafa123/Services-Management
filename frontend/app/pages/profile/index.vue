<template>
  <div class="main-container">
    <div class="profile-container">
      <div class="title">Profile Form</div>
      <Form @submit="onSubmit" :validation-schema="schema">
        <div class="form-group">
          <label for="phone">Phone Number</label>
          <Field name="phone" type="text" placeholder="Enter your phone number" />
          <ErrorMessage name="phone" class="error" />
        </div>

        <div class="form-group">
          <label for="address">Address</label>
          <Field name="address" type="text" placeholder="Enter your address" />
          <ErrorMessage name="address" class="error" />
        </div>

        <div class="form-group">
          <label for="dob">Date of Birth</label>
          <Field name="dob" type="date" />
          <ErrorMessage name="dob" class="error" />
        </div>

        <button type="submit" :disabled="loading">
          {{ loading ? 'Submitting...' : 'Save Profile' }}
        </button>
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

const loading = ref(false)

const schema = yup.object({
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
    .required('Phone number is required'),
  address: yup.string().required('Address is required'),
  dob: yup
    .date()
    .max(new Date(), 'Date of birth cannot be in the future')
    .required('Date of birth is required'),
})

const onSubmit = async (values: { phone: string; address: string; dob: string }) => {
  loading.value = true
  try {
    console.log('Profile submitted:', values)
  } catch (error) {
    console.error('Profile save failed:', error)
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
  background-color: #d5e6f7;

  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-container {
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  width: 360px;
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
