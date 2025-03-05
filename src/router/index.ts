import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ReviewsView from '../views/ReviewsPage.vue'
import ProfileView from '../views/ProfilePage.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/reviews', component: ReviewsView },
  { path: '/profile', component: ProfileView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
