<script setup>
import Navbar from "../components/Navbar.vue";
import ProfileSideMenu from "../components/UserProfile/ProfileSideMenu.vue";
import { RouterView } from 'vue-router';
</script>

<template>
    <Navbar />
    <div class="flex items-center justify-center h-screen bg-gray-100">
        <div class="flex h-2/4">
            <div class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
                <ProfileSideMenu class="xl:col-span-1 lg:col-span-1"/>
                <RouterView class="xl:col-span-3 lg:col-span-2"/>
            </div>
         </div>
    </div>
</template>