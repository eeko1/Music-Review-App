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
          <button class="edit-button" @click="openEditModal(review)">Edit</button>
        </div>
      </div>
    </div>

    <div v-if="isModalOpen" class="modal-overlay">
      <div class="modal-content">
        <h2>Edit Review</h2>
        <label>Album:</label>
        <input v-model="editedReview.album" v-if="editedReview" />

        <label>Artist:</label>
        <input v-model="editedReview.artist" v-if="editedReview" />

        <label>Category:</label>
        <select v-model="editedReview.category" required v-if="editedReview">
          <option value="Pop">Pop</option>
          <option value="Rock">Rock</option>
          <option value="Hip-hop">Hip-Hop</option>
          <option value="Jazz">Jazz</option>
          <option value="Classical">Classical</option>
          <option value="Electronic">Electronic</option>
        </select>

        <label>Comments:</label>
        <textarea v-model="editedReview.review" v-if="editedReview"></textarea>

        <label>Score (1-10):</label>
        <input
          type="number"
          v-model.number="editedReview.points"
          min="1"
          max="10"
          required
          v-if="editedReview"
        />

        <label>Cover Image URL:</label>
        <input v-model="editedReview.cover_image" required v-if="editedReview" />

        <button @click="saveChanges">Save edit</button>
        <button @click="deleteReview">Delete review</button>
        <button @click="closeModal">Cancel</button>
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

const isModalOpen = ref(false)
const editedReview = ref<Review | null>(null)

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

const openEditModal = (review: Review) => {
  editedReview.value = { ...review }
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  editedReview.value = null
}

const saveChanges = async () => {
  if (!editedReview.value) return

  const { error: updateError } = await supabase
    .from('reviews')
    .update({
      album: editedReview.value.album,
      artist: editedReview.value.artist,
      category: editedReview.value.category,
      review: editedReview.value.review,
      points: editedReview.value.points,
      cover_image: editedReview.value.cover_image,
    })
    .eq('id', editedReview.value.id)

  if (updateError) {
    console.error(updateError)
    return
  }

  const index = reviews.value.findIndex((r) => r.id === editedReview.value?.id)
  if (index !== -1) reviews.value[index] = { ...editedReview.value }

  closeModal()
}

const deleteReview = async () => {
  if (!editedReview.value) return

  const { error: deleteError } = await supabase
    .from('reviews')
    .delete()
    .eq('id', editedReview.value.id)

  if (deleteError) {
    console.error(deleteError)
    return
  }

  reviews.value = reviews.value.filter((r) => r.id !== editedReview.value?.id)

  closeModal()
}

const uniqueCategories = computed(() => {
  return [...new Set(reviews.value.map((review) => review.category))]
})

const filteredReviews = computed(() => {
  if (!selectedCategory.value) return reviews.value
  return reviews.value.filter((review) => review.category === selectedCategory.value)
})
</script>
