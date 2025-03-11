<template>
  <nav class="navbar">
    <div class="site-title">Reviewed</div>
    <div class="nav-links">
      <router-link to="/">Home</router-link>
      <router-link to="/reviews">Reviews</router-link>
      <router-link to="/stats">Stats</router-link>
      <router-link to="/addreview">Add Review</router-link>
    </div>
  </nav>
</template>

<script lang="ts">
export default {
  name: 'NavigationBar',
}
</script>
