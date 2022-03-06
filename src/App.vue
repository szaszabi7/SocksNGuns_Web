<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
    </nav>
    <div class="wrapper">
      <HelloWorld msg="You did it!" />

    </div>
  </header>

  <RouterView />
</template>

<style>


</style>
