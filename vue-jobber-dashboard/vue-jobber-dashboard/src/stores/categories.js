import { defineStore } from 'pinia'
import { ref } from 'vue'
import { categoriesApi } from '../api/categoriesService.js'

export const useCategoriesStore = defineStore('categories', () => {

  const categories = ref([])
  const loading    = ref(false)
  const error      = ref(null)

  // GET all categories
  async function fetchAll(params = {}) {
    loading.value = true
    error.value   = null
    try {
      const res = await categoriesApi.getAll(params)
      categories.value = res.data.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to load categories'
    } finally {
      loading.value = false
    }
  }

  // POST create
  async function create(data) {
    const res = await categoriesApi.create(data)
    categories.value.push(res.data.data)
    return res.data.data
  }

  // PUT update
  async function update(id, data) {
    const res = await categoriesApi.update(id, data)
    const index = categories.value.findIndex(c => c.id === id)
    if (index !== -1) categories.value[index] = res.data.data
    return res.data.data
  }

  // DELETE
  async function remove(id) {
    await categoriesApi.remove(id)
    categories.value = categories.value.filter(c => c.id !== id)
  }

  return { categories, loading, error, fetchAll, create, update, remove }
})