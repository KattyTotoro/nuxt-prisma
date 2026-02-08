<template>
  <div style="display: flex; gap: 10px;">
    <NuxtLink to="/">main</NuxtLink>  
    <NuxtLink to="/categories">categories</NuxtLink>  
    <NuxtLink to="/users">users</NuxtLink>  
  </div>
  <nav style="display:flex; gap:10px">
    <NuxtLink to="/">home</NuxtLink>
    <NuxtLink to="/users">users</NuxtLink>
    <NuxtLink to="/posts">posts</NuxtLink>
  </nav>
  <div>
    <NuxtPage />
  </div>
</template>
