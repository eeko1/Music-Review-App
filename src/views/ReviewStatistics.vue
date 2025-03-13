<template>
  <div class="chart-section">
    <h3>Review Statistics</h3>
    <div class="charts-container">
      <div class="chart-container">
        <h4>Top 3 Genres</h4>
        <canvas id="genreChart"></canvas>
      </div>
      <div class="chart-container">
        <h4>Top 3 Artists</h4>
        <canvas id="artistChart"></canvas>
      </div>
      <div class="chart-container">
        <h4>Top 3 Reviewers</h4>
        <canvas id="reviewerChart"></canvas>
      </div>
    </div>
  </div>
</template>

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

const getTopThree = (counts: Record<string, number>) => {
  const sorted = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
  const total = sorted.reduce((sum, [, count]) => sum + count, 0)
  return sorted.map(([label, count]) => ({
    label,
    percentage: ((count / total) * 100).toFixed(1),
  }))
}

const genreCounts = computed(() => {
  const counts: Record<string, number> = {}
  reviews.value.forEach((review) => {
    counts[review.category] = (counts[review.category] || 0) + 1
  })
  return getTopThree(counts)
})

const artistCounts = computed(() => {
  const counts: Record<string, number> = {}
  reviews.value.forEach((review) => {
    counts[review.artist] = (counts[review.artist] || 0) + 1
  })
  return getTopThree(counts)
})

const reviewerCounts = computed(() => {
  const counts: Record<string, number> = {}
  reviews.value.forEach((review) => {
    counts[review.reviewer_name] = (counts[review.reviewer_name] || 0) + 1
  })
  return getTopThree(counts)
})

const createChart = (
  canvasId: string,
  data: { label: string; percentage: string }[],
  label: string,
) => {
  const ctx = document.getElementById(canvasId) as HTMLCanvasElement
  if (!ctx) return
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: data.map((d) => `${d.label} (${d.percentage}%)`),
      datasets: [
        {
          label,
          data: data.map((d) => parseFloat(d.percentage)),
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
    createChart('genreChart', genreCounts.value, 'Top Genres')
    createChart('artistChart', artistCounts.value, 'Top Artists')
    createChart('reviewerChart', reviewerCounts.value, 'Top Reviewers')
  })
})
</script>
