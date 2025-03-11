import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ReviewsView from '../views/ReviewsPage.vue'
import ReviewStats from '../views/ReviewStatistics.vue'
import AddReview from '@/views/AddReview.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/reviews', component: ReviewsView },
  { path: '/stats', component: ReviewStats },
  { path: '/addreview', component: AddReview },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
