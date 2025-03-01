import { defineStore } from 'pinia';
import reviews from '../data/reviews.json';

export const useReviewsStore = defineStore('reviews', {
  state: () => ({
    reviews: reviews
  })
});
