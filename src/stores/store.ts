import { defineStore } from 'pinia'
import { ref, onMounted } from 'vue'
import axios from 'axios'

interface Review {
  album: string
  artist: string
  cover_image: string
  category: string
  label: string
  reviewed: string
  review: string
  points: number
}

export const useReviewsStore = defineStore('reviews', () => {
  const reviews = ref<Review[]>([])

  const fetchReviews = async () => {
    try {
      const response = await axios.get<Review[]>('http://localhost:3000/reviews')
      reviews.value = response.data
    } catch (error) {
      console.error('Error fetching reviews:', error)
    }
  }

  onMounted(fetchReviews)

  return { reviews, fetchReviews }
})
