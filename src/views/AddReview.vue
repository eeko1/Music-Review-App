<template>
  <div class="add-review">
    <h2>Add a New Review</h2>
    <form @submit.prevent="submitReview">
      <label>Reviewer name:</label>
      <input v-model="reviewer_name" required />

      <label>Album:</label>
      <input v-model="album" required />

      <label>Artist:</label>
      <input v-model="artist" required />

      <label>Category:</label>
      <select v-model="category" required>
        <option value="Pop">Pop</option>
        <option value="Rock">Rock</option>
        <option value="Hip-hop">Hip-Hop</option>
        <option value="Jazz">Jazz</option>
        <option value="Classical">Classical</option>
        <option value="Electronic">Electronic</option>
      </select>

      <label>Comments:</label>
      <textarea v-model="review" required></textarea>

      <label>Score (1-10):</label>
      <input type="number" v-model.number="points" min="1" max="10" required />

      <label>Cover Image URL:</label>
      <input v-model="cover_image" required />

      <button type="submit">Submit Review</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

const reviewer_name = ref('')
const album = ref('')
const artist = ref('')
const category = ref('')
const review = ref('')
const points = ref(1)
const cover_image = ref('')

const submitReview = async () => {
  const today = new Date().toISOString().split('T')[0]

  const newReview = {
    reviewer_name: reviewer_name.value,
    album: album.value,
    artist: artist.value,
    category: category.value,
    review: review.value,
    reviewed: today,
    points: points.value,
    cover_image: cover_image.value,
  }

  const { data, error } = await supabase.from('reviews').insert([newReview])

  if (error) {
    console.error('Error:', error)
    alert('Failed to add review.')
  } else {
    console.log('Review inserted:', data)
    alert('Review added successfully!')
    resetForm()
  }
}

const resetForm = () => {
  reviewer_name.value = ''
  album.value = ''
  artist.value = ''
  category.value = ''
  review.value = ''
  points.value = 1
  cover_image.value = ''
}
</script>
