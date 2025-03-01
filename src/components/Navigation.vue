<template>
  <nav>
    <router-link to="/">
      <font-awesome-icon :icon="['fas', 'house']" /> Home
    </router-link>
    <router-link to="/reviews">
      <font-awesome-icon :icon="['fas', 'user']" /> Reviews
    </router-link>
    <router-link to="/profile">
      <font-awesome-icon :icon="['fas', 'user']" /> Profile
    </router-link>
  </nav>
</template>