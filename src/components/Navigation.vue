<template>
  <nav class="navbar">
    <div class="site-title">Reviewed</div>
    <div class="nav-links">
      <router-link to="/">Home</router-link>
      <router-link to="/reviews">Reviews</router-link>
      <router-link to="/profile">Profile</router-link>
    </div>
  </nav>
</template>

<script lang="ts">
export default {
  name: 'NavigationBar',
}
</script>
