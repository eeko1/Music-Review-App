<template>
  <section class="hero">
    <img src="../assets/vinyl.gif" alt="Courses Logo" class="hero-img" />
    <h1 class="hero-title">REVIEWED</h1>
    <p class="hero-description">
      The best reviews of the best albums. Check out the top reviews below. and click the button to
      see all reviews.
    </p>
    <router-link to="/reviews" aria-label="Get Started with Code Courses" class="hero-button">
      My reviews
    </router-link>
  </section>
  <div class="top-reviews">
    <div v-for="(review, index) in topReviews" :key="index" class="review-box">
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
</template>

<script setup>
import { computed } from 'vue'
import { useReviewsStore } from '../stores/store'
import { storeToRefs } from 'pinia'

const store = useReviewsStore()
const { reviews } = storeToRefs(store)

const topReviews = computed(() => {
  if (!reviews.value || reviews.value.length === 0) return []
  return [...reviews.value].sort((a, b) => b.points - a.points).slice(0, 3)
})
</script>
