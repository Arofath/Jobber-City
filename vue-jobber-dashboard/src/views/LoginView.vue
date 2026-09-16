<template>
  <div class="min-h-screen bg-[#f8f9fc] flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl border border-[#e8eaf2] p-8 w-full max-w-md"
      style="box-shadow:0 4px 16px 0 rgba(16,24,40,0.10)">

      <!-- Logo -->
      <div class="flex items-center gap-3 mb-8">
        <div class="w-10 h-10 rounded-xl flex items-center justify-center">
        <img src="/src/assets/jbc.png" alt="">
        </div>
        <div>
          <p class="font-display text-base font-bold text-gray-900 leading-none">Jobber City</p>
          <p class="text-xs text-gray-400">Admin Console</p>
        </div>
      </div>

      <h1 class="font-display text-2xl font-bold text-gray-900 mb-1">Welcome back</h1>
      <p class="text-sm text-gray-500 mb-6">Sign in to your admin account</p>

      <!-- Error alert -->
      <div v-if="errorMsg" class="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600">
        {{ errorMsg }}
      </div>

      <!-- Form -->
      <form @submit.prevent="handleLogin" class="space-y-4">
        <!-- Email -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
          <input
            v-model="form.email"
            type="email"
            placeholder="admin@example.com"
            required
            class="w-full px-4 py-2.5 text-sm bg-[#f8f9fc] border border-[#e8eaf2] rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400 transition"
            :class="{ 'border-red-400 bg-red-50': errors.email }"
          />
          <p v-if="errors.email" class="text-xs text-red-500 mt-1">{{ errors.email }}</p>
        </div>

        <!-- Password -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
          <div class="relative">
            <input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="••••••••"
              required
              class="w-full px-4 py-2.5 pr-10 text-sm bg-[#f8f9fc] border border-[#e8eaf2] rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400 transition"
              :class="{ 'border-red-400 bg-red-50': errors.password }"
            />
            <button type="button" @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <svg v-if="!showPassword" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <svg v-else class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"/>
              </svg>
            </button>
          </div>
          <p v-if="errors.password" class="text-xs text-red-500 mt-1">{{ errors.password }}</p>
        </div>

        <!-- Submit -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full py-2.5 bg-brand-600 text-white text-sm font-semibold rounded-xl hover:bg-brand-700 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <svg v-if="loading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
          {{ loading ? 'Signing in...' : 'Sign in' }}
        </button>
      </form>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'

const router   = useRouter()
const authStore = useAuthStore()

const form = reactive({ email: '', password: '' })
const errors     = reactive({ email: '', password: '' })
const loading    = ref(false)
const errorMsg   = ref('')
const showPassword = ref(false)

function validate() {
  errors.email    = ''
  errors.password = ''
  let valid = true

  if (!form.email) {
    errors.email = 'Email is required'
    valid = false
  } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    errors.email = 'Enter a valid email'
    valid = false
  }

  if (!form.password) {
    errors.password = 'Password is required'
    valid = false
  } else if (form.password.length < 6) {
    errors.password = 'Password must be at least 6 characters'
    valid = false
  }

  return valid
}

async function handleLogin() {
  errorMsg.value = ''
  if (!validate()) return

  loading.value = true
  try {
    await authStore.login(form.email, form.password)
    router.push('/seeker/dashboard')
  } catch (err) {
    errorMsg.value = err.response?.data?.message || 'Invalid email or password'
  } finally {
    loading.value = false
  }
}
</script>