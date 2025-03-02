<template>
  <nav class="navbar">
    <div class="logo">
      <img src="../assets/musicreviewlogo.png" alt="Logo" />
    </div>
    <div class="nav-links">
      <router-link to="/">Home</router-link>
      <router-link to="/reviews">Reviews</router-link>
      <router-link to="/profile">Profile</router-link>
    </div>
    <button class="menu-toggle" @click="toggleMenu">☰</button>
  </nav>
  <div v-if="menuOpen" class="mobile-menu">
    <router-link to="/" @click="toggleMenu">Home</router-link>
    <router-link to="/reviews" @click="toggleMenu">Reviews</router-link>
    <router-link to="/profile" @click="toggleMenu">Profile</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
  },
};
</script>
