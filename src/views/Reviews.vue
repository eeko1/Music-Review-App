<template>
  <div class="home">
    <div class="reviews">
      <div v-for="(review, index) in reviews" :key="index" class="review-box">
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

<script setup>
import { useReviewsStore } from '../stores/store'
import { storeToRefs } from 'pinia'

const store = useReviewsStore()
const { reviews } = storeToRefs(store)
</script>
