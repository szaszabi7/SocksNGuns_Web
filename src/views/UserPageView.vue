<script setup>
import Navbar from "../components/Navbar.vue";
import ProfileSideMenu from "../components/UserProfile/ProfileSideMenu.vue";
import { RouterView } from 'vue-router';
</script>

<template>
    <Navbar />
    <div class="flex items-center justify-center h-screen bg-gray-100">
        <div class="flex md:h-3/5">
            <div class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 w-full shadow-lg rounded-2xl overflow-hidden">
                <ProfileSideMenu/>
                <RouterView class="xl:col-span-3 lg:col-span-2 md:col-span-2 overflow-y-scroll"/>
            </div>
         </div>
    </div>
</template>

<style scoped>
::-webkit-scrollbar {
  width: 10px;
}


::-webkit-scrollbar-track {
  @apply rounded-r-2xl bg-white
}
 

::-webkit-scrollbar-thumb {
  @apply bg-pink-600
}


::-webkit-scrollbar-thumb:hover {
  @apply bg-pink-900
}
</style>