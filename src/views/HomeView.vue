<template>
  <div class="home">
    <div class="reviews">
      <div v-for="(review, index) in reviews" :key="index" class="review-box">
        <h3>{{ review.album }}</h3>
        <p>{{ review.artist }}</p>
        <p>{{ review.review }}</p>
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
