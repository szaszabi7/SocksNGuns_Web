<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
    <div class="w-64 bg-pink-500 rounded-l-2xl">
        <div class="py-6 pl-6">
            <div class="flex pl-4 pr-10 py-2 text-white">
                <!-- profil iamge -->
                <!-- Helló {{username}} -->
                <!-- user type (vásárló, admin) -->
            </div>
            <RouterLink to="/user/profile" >
                <div class="pl-4 pr-10 py-2 text-white hover:bg-white hover:text-pink-500 hover:rounded-l-3xl">Profil</div>
            </RouterLink>
            <RouterLink to="/user/">
                <div class="pl-4 pr-10 py-2 text-white hover:bg-white hover:text-pink-500 hover:rounded-l-3xl">Szállítási adatok</div>
            </RouterLink>
            <RouterLink to="/user/">
                <div class="pl-4 pr-10 py-2 text-white hover:bg-white hover:text-pink-500 hover:rounded-l-3xl">Rendelések</div>
            </RouterLink>
        </div>
     </div>
</template>

<style scoped>
a.router-link-exact-active div{
    background-color: white;
    color: theme('colors.pink.500');
    border-top-left-radius: 1.5rem;
    border-bottom-left-radius: 1.5rem;
    cursor: default;
}

</style>