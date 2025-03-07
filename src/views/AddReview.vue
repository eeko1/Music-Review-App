<template>
  <div class="add-review">
    <h2>Add a New Review</h2>
    <form @submit.prevent="submitReview">
      <label>Album:</label>
      <input v-model="album" required />

      <label>Artist:</label>
      <input v-model="artist" required />

      <label>Category:</label>
      <input v-model="category" required />

      <label>Review:</label>
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

const album = ref('')
const artist = ref('')
const category = ref('')
const review = ref('')
const points = ref(1)
const cover_image = ref('')

const submitReview = async () => {
  const today = new Date().toISOString().split('T')[0]

  const newReview = {
    album: album.value,
    artist: artist.value,
    category: category.value,
    review: review.value,
    reviewed: today,
    points: points.value,
    cover_image: cover_image.value,
  }

  const response = await fetch('http://localhost:3000/reviews', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newReview),
  })

  if (response.ok) {
    alert('Review added successfully!')
    album.value = ''
    artist.value = ''
    category.value = ''
    review.value = ''
    points.value = 1
    cover_image.value = ''
  } else {
    alert('Failed to add review.')
  }
}
</script>
