<script>
import { RouterLink } from 'vue-router';
import { ref } from 'vue';

    export default {
        setup() {
            let showMenu = ref(false);
            const toggleNav = () => (showMenu.value = !showMenu.value);
            return { 
                showMenu, 
                toggleNav 
            };
        },
    };
</script>

<template>
    <nav class="bg-gray-300 fixed inset-x-0 top-0">
        <div class="px-4 md:px-8">
            <div class="flex justify-between">
                <div class="flex">
                    <div>
                        <RouterLink to="/" class="flex items-center py-3">
                            <!-- logo -->
                            <span class="font-bold text-xl">Socks&Guns</span>
                        </RouterLink>
                    </div>
                </div>

                <div class="hidden md:flex items-center">
                    <RouterLink to="/login" class="block py-2 px-4 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </RouterLink>
                </div>

                <div class="md:hidden flex items-center">
                    <button @click="toggleNav">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <div :class="showMenu ? 'block' : 'hidden'" class="md:hidden">
            <a href="#" class="block py-2 px-4 text-sm">placeholder</a>
            <a href="#" class="block py-2 px-4 text-sm">placeholder</a>
        </div>
    </nav>
</template>