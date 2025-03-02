<template>
  <div class="home">
    <div class="reviews">
      <div v-for="(review, index) in reviews" :key="index" class="review-box">
        <img :src="review.cover_image" :alt="review.album" class="cover" />
        <h3>{{ review.album }}</h3>
        <p><strong>Artist:</strong> {{ review.artist }}</p>
        <p><strong>Category:</strong> {{ review.category }}</p>
        <p><strong>Label:</strong> {{ review.label }}</p>
        <p><strong>Reviewed:</strong> {{ review.reviewed }}</p>
        <p><strong>Review:</strong> {{ review.review }}</p>
        <p><strong>Score:</strong> {{ review.points }}/10</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useReviewsStore } from '../stores/store';
import { storeToRefs } from 'pinia';

const store = useReviewsStore();
const { reviews } = storeToRefs(store);
</script>
