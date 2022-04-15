<script>
import { RouterLink } from 'vue-router';
import { onMounted, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';


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
                store.dispatch('getUser')
            }
    
            //onMounted(userGet)

            return { 
                showMenu, 
                toggleNav,
                logout,
                loggedIn
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

                <div class="hidden sm:flex items-center">
                    <RouterLink to="/search">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </RouterLink>
                    <RouterLink v-if="loggedIn" to="/user" class="block py-2 px-4 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </RouterLink>
                    <RouterLink v-else to="/login" class="block py-2 px-4 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </RouterLink>
                    <button v-if="loggedIn" @click="logout">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
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