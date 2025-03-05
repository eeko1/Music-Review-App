<template>
  <div class="home">
    <div class="filter-container">
      <label for="category">Filter by Category:</label>
      <select v-model="selectedCategory" id="category">
        <option value="">All</option>
        <option v-for="(category, index) in uniqueCategories" :key="index" :value="category">
          {{ category }}
        </option>
      </select>
    </div>

    <div class="reviews">
      <div v-for="(review, index) in filteredReviews" :key="index" class="review-box">
        <div class="cover-container">
          <img :src="review.cover_image" :alt="review.album" class="cover" />
          <div class="score">{{ review.points }}/10</div>
        </div>
        <div class="review-content">
          <p class="category">{{ review.category }}</p>
          <h3 class="album">{{ review.album }}</h3>
          <p class="artist">{{ review.artist }}</p>
          <p class="reviewer">{{ review.review }}</p>
          <p class="date">{{ review.reviewed }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useReviewsStore } from '../stores/store'
import { storeToRefs } from 'pinia'

const store = useReviewsStore()
const { reviews } = storeToRefs(store)

const selectedCategory = ref('')

const uniqueCategories = computed(() => {
  return [...new Set(reviews.value.map((review) => review.category))]
})

const filteredReviews = computed(() => {
  if (!selectedCategory.value) return reviews.value
  return reviews.value.filter((review) => review.category === selectedCategory.value)
})
</script>
