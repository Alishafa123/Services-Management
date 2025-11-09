import { useUserStore } from '../stores/userStore'

const API_URL = "http://localhost:3001"

// Profile APIs
export const createProfile = async (data: { phone: string; address: string; dob: Date }) => {
  const userStore = useUserStore()
  const response = await $fetch(`${API_URL}/profiles`, {
    method: 'POST',
    body: {
      userId: userStore.user?.id,
      ...data,
    },
  })
  return response
}

// Service APIs
export const createServices = async (data: {
  onsite: { name: string; price: number }[]
  offsite: { name: string; price: number }[]
}) => {
  const response = await $fetch(`${API_URL}/services/bulk`, {
    method: 'POST',
    body: data,
  })
  return response
}

export const getAllServices = async () => {
  const response = await $fetch(`${API_URL}/services`, {
    method: 'GET',
  })
  return response
}

export const getServiceById = async (id: string) => {
  const response = await $fetch(`${API_URL}/services/${id}`, {
    method: 'GET',
  })
  return response
}

export const getServiceByuserId = async () => {
    const userStore = useUserStore()
   const userId = userStore.user?.id
  const response = await $fetch(`${API_URL}/services/${userId}`, {
    method: 'GET',
  })
  return response
}

export const updateService = async (id: string, data: { name?: string; price?: number; type?: string }) => {
  const response = await $fetch(`${API_URL}/services/${id}`, {
    method: 'PUT',
    body: data,
  })
  return response
}

export const deleteService = async (id: string) => {
  const response = await $fetch(`${API_URL}/services/${id}`, {
    method: 'DELETE',
  })
  return response
}

// Package APIs
export const createPackage = async (data: {
  name: string
  description?: string
  services: number[]
  totalPrice: number
}) => {
  const response = await $fetch(`${API_URL}/packages`, {
    method: 'POST',
    body: data,
  })
  return response
}

export const getAllPackages = async () => {
  const response = await $fetch(`${API_URL}/packages`, {
    method: 'GET',
  })
  return response
}

export const getPackageById = async (id: number) => {
  const response = await $fetch(`${API_URL}/packages/${id}`, {
    method: 'GET',
  })
  return response
}

export const deletePackage = async (id: number) => {
  const response = await $fetch(`${API_URL}/packages/${id}`, {
    method: 'DELETE',
  })
  return response
}
