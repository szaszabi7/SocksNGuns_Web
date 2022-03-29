<script setup>
import Navbar from "../components/Navbar.vue";
import ProfileSideMenu from "../components/ProfileSideMenu.vue";
import { RouterView } from 'vue-router';
</script>

<template>
    <Navbar />
    <div class="flex items-center justify-center h-screen bg-gray-100">
        <div class="flex h-2/4">
            <ProfileSideMenu />
            <RouterView />
         </div>
    </div>
</template>