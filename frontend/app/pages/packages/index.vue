<template>
  <div class="main-container">
    <div class="packages-container">
      <div class="title">Create Package</div>

      <Form @submit="onSubmit">
        <div class="package-name">
          <Field
            name="packageName"
            v-model="packageName"
            placeholder="Enter package name"
            class="service-input"
          />
        </div>

        <div class="service-section">
          <h3>Onsite Services</h3>
          <div class="tags">
            <span
              v-for="(service, index) in onsite"
              :key="'onsite-'+index"
              class="tag"
              :class="{ selected: isSelected(service) }"
              @click="toggleService(service)"
            >
              {{ service.name }}
            </span>
          </div>
        </div>

        <!-- Offsite Services -->
        <div class="service-section">
          <h3>Offsite Services</h3>
          <div class="tags">
            <span
              v-for="(service, index) in offsite"
              :key="'offsite-'+index"
              class="tag"
              :class="{ selected: isSelected(service) }"
              @click="toggleService(service)"
            >
              {{ service.name }}
            </span>
          </div>
        </div>

        <!-- Selected Package Services -->
        <div class="service-section">
          <h3>Selected Services for Package</h3>
          <div v-if="selectedServices.length" class="tags">
            <span
              v-for="(service, index) in selectedServices"
              :key="'selected-'+index"
              class="tag selected"
            >
              {{ service.name }}
              <span class="tag-remove" @click="removeFromPackage(index)">×</span>
            </span>
          </div>
          <p v-else class="empty-text">No services selected yet.</p>
        </div>

        <button type="submit" :disabled="loading">{{ loading ? 'Saving...' : 'Save Package' }}</button>
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Form, Field } from 'vee-validate'
import { getAllServices } from '~/utils/api'

const loading = ref(false)
const packageName = ref('')
const onsite = ref<{ name: string; id: number }[]>([])
const offsite = ref<{ name: string; id: number }[]>([])
const selectedServices = ref<{ name: string; id: number }[]>([])

onMounted(async () => {
  await fetchServices()
})

const fetchServices = async () => {
  try {
    loading.value = true
    const response = await getAllServices() as any

    console.log(response)
    onsite.value = response.onsite || []
    offsite.value = response.offsite || []
  } catch (error) {
    console.error('Error fetching services:', error)
  } finally {
    loading.value = false
  }
}

const toggleService = (service: { name: string; id: number }) => {
  const exists = selectedServices.value.find(s => s.id === service.id)
  if (exists) {
    selectedServices.value = selectedServices.value.filter(s => s.id !== service.id)
  } else {
    selectedServices.value.push(service)
  }
}

const isSelected = (service: { id: number }) => {
  return selectedServices.value.some(s => s.id === service.id)
}

const removeFromPackage = (index: number) => {
  selectedServices.value.splice(index, 1)
}

const onSubmit = async () => {
  if (!packageName.value.trim()) {
    alert('Please enter a package name.')
    return
  }

  if (selectedServices.value.length === 0) {
    alert('Please select at least one service.')
    return
  }

  const payload = {
    name: packageName.value,
    services: selectedServices.value.map(s => s.id),
    price:0
  }

  console.log('Saving package:', payload)
  await createPackage(payload)
  navigateTo("/setPrice")
}
</script>

<style>
.main-container {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eef3fa;
}

.packages-container {
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  width: 550px;
}

.title {
  text-align: center;
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.service-section {
  margin-bottom: 2rem;
}

.package-name {
  margin-bottom: 1.5rem;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.tag {
  background-color: #4f46e5;
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tag:hover {
  background-color: #4338ca;
}

.tag.selected {
  background-color: #10b981;
}

.tag-remove {
  margin-left: 0.5rem;
  font-weight: bold;
  cursor: pointer;
}

.empty-text {
  color: #888;
  font-size: 0.9rem;
}

.service-input {
  width: 100%;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ccc;
}

button[type='submit'] {
  width: 100%;
  padding: 0.75rem;
  background-color: #4f46e5;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

button[type='submit']:hover {
  background-color: #4338ca;
}

button:disabled {
  background-color: #a5b4fc;
  cursor: not-allowed;
}
</style>
