<template>
  <div style="display: flex; gap: 10px;">
    <NuxtLink to="/">main</NuxtLink>  
    <NuxtLink to="/categories">categories</NuxtLink>  
    <NuxtLink to="/users">users</NuxtLink>  
    <NuxtLink to="/posts">posts</NuxtLink>
    <NuxtLink to="/groups">groups</NuxtLink>
    <NuxtLink to="/homemanagement">homemanagement</NuxtLink>
  </div>
  <div v-if="route.path.includes('/homemanagement')" style="display: flex; gap: 10px;">
    <NuxtLink to="/homemanagement/apartments">apartments</NuxtLink>
    <NuxtLink to="/homemanagement/costbyperiod">costbyperiod</NuxtLink>
    <NuxtLink to="/homemanagement/indications">indications</NuxtLink>
  </div>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
</script>
