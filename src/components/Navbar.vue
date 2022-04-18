<script>
import { RouterLink } from 'vue-router';
import { onMounted, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { computed } from '@vue/reactivity';


    export default {
        setup() {
            let showMenu = ref(false);
            const toggleNav = () => (showMenu.value = !showMenu.value);

            const store = useStore();
            const router = useRouter();
    
            function logout() {
                store.dispatch("logout")
                    .then(() => {
                        router.push({
                            name: "HomePage",
                        })
                    });
                loggedIn.value = false;
            }

            let loggedIn = ref(false)

            if (store.state.user.token) {
                loggedIn.value = true;
            }

            function userGet() {
                store.dispatch('getUser').catch(err => {
                        if (err.response.status == 401) {
                            console.log(err.response.data.message);
                        }
                    })
            }
    
            onMounted(userGet)

            const cartItemCount = computed(() => store.getters.cartItemCount)

            return { 
                showMenu, 
                toggleNav,
                logout,
                loggedIn,
                cartItemCount
            };
        },
        components: { RouterLink }
    }
</script>

<template>
    <nav class="fixed inset-x-0 top-0 h-14 bg-pink-500 text-white">
        <div class="px-4 md:px-8">
            <div class="flex justify-between items-center">
                <div class="flex">
                    <div>
                        <RouterLink to="/" class="flex items-center py-3">
                            <!-- logo -->
                            <span class="font-bold text-xl">Socks&Guns</span>
                        </RouterLink>
                    </div>
                </div>

                <!-- <div class="hidden">
                    
                    <span class="mr-2">Zoknik</span>
                    <span>Fegyverek</span>
                </div> -->

                <div class="hidden sm:flex sm:gap-4 items-center">
                    <RouterLink to="/search">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 transition-all hover:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </RouterLink>
                    <RouterLink to="/cart">
                        <div class="flex items-center transition-all hover:text-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <p class="text-lg ml-1">
                                {{ cartItemCount }}
                            </p>
                        </div>
                    </RouterLink>
                    <RouterLink v-if="loggedIn" to="/user">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 transition-all hover:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </RouterLink>
                    <RouterLink v-else to="/login">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 transition-all hover:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </RouterLink>
                    <button v-if="loggedIn" @click="logout">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 transition-all hover:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </button>
                </div>

                <div class="sm:hidden flex items-center">
                    <button @click="toggleNav">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <div :class="showMenu ? 'block' : 'hidden'" class="sm:hidden bg-pink-500">
            <a href="#" class="block py-2 px-4 text-sm">placeholder</a>
            <a href="#" class="block py-2 px-4 text-sm">placeholder</a>
        </div>
    </nav>
</template>