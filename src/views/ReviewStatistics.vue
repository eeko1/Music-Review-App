<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Chart, registerables } from 'chart.js'
import { createClient } from '@supabase/supabase-js'

Chart.register(...registerables)

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

interface Review {
  id: number
  reviewer_name: string
  album: string
  artist: string
  cover_image: string
  category: string
  reviewed: string
  review: string
  points: number
}

const reviews = ref<Review[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const fetchReviews = async () => {
  loading.value = true
  error.value = null

  const { data, error: fetchError } = await supabase.from('reviews').select('*')

  if (fetchError) {
    error.value = 'Failed to fetch reviews.'
    console.error(fetchError)
  } else {
    reviews.value = data || []
  }

  loading.value = false
}

onMounted(fetchReviews)

const genreCounts = computed(() => {
  const counts: Record<string, number> = {}
  reviews.value.forEach((review) => {
    counts[review.category] = (counts[review.category] || 0) + 1
  })
  return counts
})

const artistCounts = computed(() => {
  const counts: Record<string, number> = {}
  reviews.value.forEach((review) => {
    counts[review.artist] = (counts[review.artist] || 0) + 1
  })
  return counts
})

const reviewerCounts = computed(() => {
  const counts: Record<string, number> = {}
  reviews.value.forEach((review) => {
    counts[review.reviewer_name] = (counts[review.reviewer_name] || 0) + 1
  })
  return counts
})

const createChart = (canvasId: string, data: Record<string, number>, label: string) => {
  const ctx = document.getElementById(canvasId) as HTMLCanvasElement
  if (!ctx) return
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: Object.keys(data),
      datasets: [
        {
          label,
          data: Object.values(data),
          backgroundColor: ['#ff6384', '#36a2eb', '#ffce56'],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  })
}

onMounted(() => {
  fetchReviews().then(() => {
    createChart('genreChart', genreCounts.value, 'Popular Genres')
    createChart('artistChart', artistCounts.value, 'Popular Artists')
    createChart('reviewerChart', reviewerCounts.value, 'Top Reviewers')
  })
})
</script>

<template>
  <div class="chart-section">
    <h3>Review Statistics</h3>
    <div class="charts-container">
      <div class="chart"><canvas id="genreChart"></canvas></div>
      <div class="chart"><canvas id="artistChart"></canvas></div>
      <div class="chart"><canvas id="reviewerChart"></canvas></div>
    </div>
  </div>
</template>
