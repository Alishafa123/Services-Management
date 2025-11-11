<template>
  <div class="main-container">
    <div class="services-container">
      <div class="title">Services</div>

      <Form @submit="onSubmit">
        <div class="service-section">
          <h3>Onsite Services</h3>

          <div class="tags">
            <span
              v-for="(service, index) in onsite"
              :key="'onsite-tag-'+index"
              class="tag"
              @click="editService('onsite', index)"
            >
              {{ service.name }}
              <span class="tag-remove" @click.stop="removeService('onsite', index)">×</span>
            </span>
          </div>

          <div class="service-item">
            <Field
              name="newOnsiteName"
              v-model="newOnsite.name"
              placeholder="Service Name"
              class="service-input"
            />
            <button type="button" class="add-btn" @click="addOrUpdateService('onsite')">
              {{ editIndexOnsite !== null ? 'Update' : 'Add' }}
            </button>
          </div>
        </div>

        <!-- Offsite Services -->
        <div class="service-section">
          <h3>Offsite Services</h3>

          <div class="tags">
            <span
              v-for="(service, index) in offsite"
              :key="'offsite-tag-'+index"
              class="tag"
              @click="editService('offsite', index)"
            >
              {{ service.name }}
              <span class="tag-remove" @click.stop="removeService('offsite', index)">×</span>
            </span>
          </div>

          <div class="service-item">
            <Field
              name="newOffsiteName"
              v-model="newOffsite.name"
              placeholder="Service Name"
              class="service-input"
            />
            <button type="button" class="add-btn" @click="addOrUpdateService('offsite')">
              {{ editIndexOffsite !== null ? 'Update' : 'Add' }}
            </button>
          </div>
        </div>

        <button type="submit" :disabled="loading">{{ loading ? 'Saving...' : 'Save Services' }}</button>
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Form, Field } from 'vee-validate'
import { createServices } from '~/utils/api'

const loading = ref(false)

const onsite = ref([{ name: 'Onsite Service 1', price: 0 }, { name: 'Onsite Service 2', price: 0 }])
const offsite = ref([{ name: 'Offsite Service 1', price: 0 }, { name: 'Offsite Service 2', price: 0 }])

const newOnsite = ref<{ name: string; price: number }>({ name: '', price: 0 })
const newOffsite = ref<{ name: string; price: number }>({ name: '', price: 0 })

const editIndexOnsite = ref<number | null>(null)
const editIndexOffsite = ref<number | null>(null)

const editService = (type: 'onsite' | 'offsite', index: number) => {
  if (type === 'onsite') {
    const service = onsite.value[index]
    if (service) {
      newOnsite.value = { name: service.name, price: service.price }
      editIndexOnsite.value = index
    }
  } else {
    const service = offsite.value[index]
    if (service) {
      newOffsite.value = { name: service.name, price: service.price }
      editIndexOffsite.value = index
    }
  }
}

const addOrUpdateService = (type: 'onsite' | 'offsite') => {
  if (type === 'onsite') {
    if (editIndexOnsite.value !== null) {
      onsite.value[editIndexOnsite.value] = { name: newOnsite.value.name, price: 0 }
      editIndexOnsite.value = null
    } else {
      onsite.value.push({ name: newOnsite.value.name, price: 0 }) // 👈 default price = 0
    }
    newOnsite.value = { name: '', price: 0 }
  } else {
    if (editIndexOffsite.value !== null) {
      offsite.value[editIndexOffsite.value] = { name: newOffsite.value.name, price: 0 }
      editIndexOffsite.value = null
    } else {
      offsite.value.push({ name: newOffsite.value.name, price: 0 }) // 👈 default price = 0
    }
    newOffsite.value = { name: '', price: 0 }
  }
}

const removeService = (type: 'onsite' | 'offsite', index: number) => {
  if (type === 'onsite') onsite.value.splice(index, 1)
  else offsite.value.splice(index, 1)
}

const onSubmit = async () => {
  loading.value = true
  try {
    const payload = {
      onsite: onsite.value.map(s => ({ name: s.name, price: 0 })),
      offsite: offsite.value.map(s => ({ name: s.name, price: 0 })),
    }

    const response = await createServices(payload)
    console.log('Services saved:', response)
    navigateTo("/packages")
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  const response=await getAllServices();
console.log(response)
})

</script>


<style>
.main-container {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d5e6f7;
}

.services-container {
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  width: 500px;
}

.title {
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.service-section {
  margin-bottom: 2rem;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.tag {
  background-color: #4f46e5;
  color: white;
  padding: 0.3rem 0.6rem;
  border-radius: 9999px;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 0.875rem;
}

.tag-remove {
  margin-left: 0.5rem;
  font-weight: bold;
  cursor: pointer;
}

.service-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.service-input {
  flex: 1;
  margin-right: 0.5rem;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.add-btn {
  background-color: #10b981; /* Green for action */
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.add-btn:hover {
  background-color: #059669; /* Darker green on hover */
}

.add-btn:disabled {
  background-color: #a5b4fc;
  cursor: not-allowed;
}


button[type="submit"] {
  width: 100%;
  padding: 0.75rem;
  background-color: #4f46e5;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:disabled {
  background-color: #a5b4fc;
  cursor: not-allowed;
}
</style>