import { defineStore } from 'pinia'
import { ref, onMounted } from 'vue'
import { createClient } from '@supabase/supabase-js'

// Load environment variables
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

interface Review {
  id: number
  album: string
  artist: string
  cover_image: string
  category: string
  reviewed: string
  review: string
  points: number
}

export const useReviewsStore = defineStore('reviews', () => {
  const reviews = ref<Review[]>([])

  // Fetch reviews from Supabase
  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('reviewed', { ascending: false })

      if (error) throw error

      reviews.value = data || []
    } catch (error) {
      console.error('Error fetching reviews:', error)
    }
  }

  // Fetch reviews when store is mounted
  onMounted(fetchReviews)

  return { reviews, fetchReviews }
})
