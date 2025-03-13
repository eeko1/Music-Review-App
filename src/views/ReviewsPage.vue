<template>
  <div id="home">
    <div id="filter-container">
      <label for="category">Filter by Category:</label>
      <select v-model="selectedCategory" id="category">
        <option value="">All</option>
        <option v-for="(category, index) in uniqueCategories" :key="index" :value="category">
          {{ category }}
        </option>
      </select>
    </div>

    <div id="reviews">
      <div v-if="loading">Loading reviews...</div>
      <div v-else-if="error" class="error-message">{{ error }}</div>
      <div v-for="review in filteredReviews" :key="review.id" class="review-box">
        <div class="cover-container">
          <img :src="review.cover_image" :alt="review.album" class="cover" />
          <div class="score">{{ review.points }}</div>
        </div>
        <div class="review-content">
          <p class="category">{{ review.category }}</p>
          <h3 class="album">{{ review.album }}</h3>
          <p class="artist">{{ review.artist }}</p>
          <p class="review-text">{{ review.review }}</p>
          <p class="reviewer">By {{ review.reviewer_name }}</p>
          <p class="date">{{ review.reviewed }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

interface Review {
  id: number
  reviewer_name: string
  album: string
  artist: string
  cover_image: string
  category: string
  reviewed: string
  review: string
  points: number
}

const reviews = ref<Review[]>([])
const selectedCategory = ref('')
const loading = ref(true)
const error = ref<string | null>(null)

const fetchReviews = async () => {
  loading.value = true
  error.value = null

  const { data, error: fetchError } = await supabase.from('reviews').select('*')

  if (fetchError) {
    error.value = 'Failed to fetch reviews.'
    console.error(fetchError)
  } else {
    reviews.value = data || []
  }

  loading.value = false
}

onMounted(fetchReviews)

const uniqueCategories = computed(() => {
  return [...new Set(reviews.value.map((review) => review.category))]
})

const filteredReviews = computed(() => {
  if (!selectedCategory.value) return reviews.value
  return reviews.value.filter((review) => review.category === selectedCategory.value)
})
</script>
