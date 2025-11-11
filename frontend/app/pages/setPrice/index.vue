<template>
  <div class="main-container">
    <div class="pricing-container">
      <div class="title">Set Prices</div>

      <!-- Services -->
      <div class="service-section">
        <h3>Onsite Services</h3>
        <div v-for="(service, index) in onsite" :key="'onsite-'+service.id" class="service-item">
          <span>{{ service.name }}</span>
          <input type="number" v-model.number="service.price" placeholder="Price" />
        </div>
      </div>

      <div class="service-section">
        <h3>Offsite Services</h3>
        <div v-for="(service, index) in offsite" :key="'offsite-'+service.id" class="service-item">
          <span>{{ service.name }}</span>
          <input type="number" v-model.number="service.price" placeholder="Price" />
        </div>
      </div>

      <!-- Packages -->
      <div class="service-section">
        <h3>Packages</h3>
        <div v-for="(pkg, index) in packages" :key="'package-'+pkg.id" class="package-item">
          <span>{{ pkg.name }}</span>
          <input type="number" v-model.number="pkg.price" placeholder="Package Price" />
        </div>
      </div>

      <button @click="saveAll" :disabled="loading">{{ loading ? 'Saving...' : 'Save Prices' }}</button>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getAllServices, getAllPackages } from '~/utils/api'

const loading = ref(false)

const onsite = ref<{ id: number; name: string; price: number }[]>([])
const offsite = ref<{ id: number; name: string; price: number }[]>([])
const packages = ref<{ id: number; name: string; price: number }[]>([])

onMounted(async () => {
  await fetchData()
})

const fetchData = async () => {
  try {
    loading.value = true

    const services: any = await getAllServices()
    onsite.value = services.onsite.map((s: any) => ({ ...s, price: s.price || 0 }))
    offsite.value = services.offsite.map((s: any) => ({ ...s, price: s.price || 0 }))

    const pkgs: any = await getAllPackages()
    packages.value = pkgs.map((p: any) => ({ ...p, price: p.price || 0 }))

  } catch (err) {
    console.error('Error fetching data:', err)
  } finally {
    loading.value = false
  }
}

const saveAll = async () => {
  try {
    loading.value = true

    const payload = {
      services: [
        ...onsite.value.map(s => ({ id: s.id, price: s.price })),
        ...offsite.value.map(s => ({ id: s.id, price: s.price }))
      ],
      packages: packages.value.map(p => ({ id: p.id, price: p.price }))
    }

    console.log('Updating prices payload:', payload)

    await updatePricing(payload)

    alert('Prices updated successfully!')
  } catch (err) {
    console.error('Error saving prices:', err)
  } finally {
    loading.value = false
  }
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
.pricing-container {
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
.service-item,
.package-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}
input {
  width: 120px;
  padding: 0.3rem 0.5rem;
  border-radius: 5px;
  border: 1px solid #ccc;
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
}
button:disabled {
  background-color: #a5b4fc;
  cursor: not-allowed;
}
</style>