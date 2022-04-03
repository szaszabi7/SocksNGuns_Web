<script setup>
import AdminSideMenu from '../components/Admin/AdminSideMenu.vue';
import { RouterView } from 'vue-router';

</script>

<template>
    <div class="flex">
        <AdminSideMenu />
        <RouterView />
    </div>
</template>