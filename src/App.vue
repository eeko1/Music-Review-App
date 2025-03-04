<template>
  <div>
    <NavigationComponent />
    <router-view></router-view>
    <FooterComponent />
  </div>
</template>

<script setup lang="ts">
import NavigationComponent from './components/Navigation.vue'
import FooterComponent from './components/Footer.vue'
</script>
