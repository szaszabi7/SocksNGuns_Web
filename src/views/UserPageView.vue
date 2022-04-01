<script setup>
import Navbar from "../components/Navbar.vue";
import ProfileSideMenu from "../components/ProfileSideMenu.vue";
import { RouterView } from 'vue-router';
</script>

<template>
    <Navbar />
    <div class="flex items-center justify-center h-screen bg-gray-100">
        <div class="flex h-2/4">
            <div class="grid grid-cols-4">
                <ProfileSideMenu class="col-span-1"/>
                <RouterView class="col-span-3"/>
            </div>
         </div>
    </div>
</template>