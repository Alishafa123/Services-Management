
const API_URL = "http://localhost:3001"

const getUserId = () => {
  const user = useCookie<any>("user")
  return user.value?.id
}

export const createProfile = async (data: { phone: string; address: string; dob: string }) => {
  const userId = getUserId()
  console.log("cookie value: ", userId)

  const response = await $fetch(`${API_URL}/profiles`, {
    method: 'POST',
    body: {
      userId,
      ...data,
    },
  })
  return response
}

export const createServices = async (data: {
  onsite: { name: string; price: number }[]
  offsite: { name: string; price: number }[]
}) => {
  const userId = getUserId()
  
  const response = await $fetch(`${API_URL}/services/bulk`, {
    method: 'POST',
    body: {
      userId,
      ...data,
    },
  })
  return response
}

export const getAllServices = async () => {
  const userId = getUserId()

  if (!userId) {
    console.error("User ID not found in cookie")
    return
  }
  
  const response = await $fetch(`${API_URL}/services/${userId}`, {
    method: "GET",
  })

  console.log("Services:", response)
  return response
}


export const getServiceById = async (id: string) => {
  const response = await $fetch(`${API_URL}/services/${id}`, {
    method: 'GET',
  })
  return response
}

export const getServiceByuserId = async () => {
   const userId = 1
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

export const createPackage = async (data: {
  name: string
  services: number[]
  price:number
}) => {
  const userId = getUserId()
  const response = await $fetch(`${API_URL}/packages`, {
    method: 'POST',
    body:{userId , ...data}
  })
  return response
}

export const getAllPackages = async () => {
  const userId = getUserId()

  if (!userId) {
    console.error("User ID not found in cookie")
    return
  }

  const response = await $fetch(`${API_URL}/packages?userId=${userId}`, {
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


export const updatePricing = async (data: {
  services: { id: number; price: number }[],
  packages: { id: number; price: number }[]
}) => {
  const userId = getUserId()

  if (!userId) {
    console.error("User ID not found in cookie")
    return
  }

  const response = await $fetch(`${API_URL}/pricing/${userId}`, {
    method: 'PUT', 
    body: data
  })
  return response
}

