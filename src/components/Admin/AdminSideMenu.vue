<script>
import { useStore } from 'vuex';
import { onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { computed } from '@vue/reactivity';
import { useRouter } from 'vue-router';

    export default {
        setup() {
            const store = useStore();
            const router = useRouter();

            function userGet() {
                store.dispatch('getUser')
            }

            onMounted(userGet)
    
            function logout() {
                store.dispatch("logout")
                    .then(() => {
                        router.push({
                            name: "HomePage",
                        })
                    });
            }

            return {
                user: computed(() => store.getters.user),
                logout
            }
        },
        components: { RouterLink }
    }
</script>

<template>
    <div class="fixed flex flex-none w-64 h-full bg-cyan-700 text-white">
        <div class="py-6 w-full">
            <RouterLink to="/">
                <div class="grid mb-10 text-white justify-items-center">
                    <div class="text-3xl">
                        Socks&Guns 
                    </div> 
                    <div class="text-lg">
                        Admin központ
                    </div> 
                </div>
            </RouterLink>
            <div class="pl-6 grid gap-2">
                <RouterLink to="/admin/dashboard" >
                    <div class="pl-4 pr-10 py-2 text-white w-full hover:bg-white hover:text-cyan-700 hover:rounded-l-3xl">Főoldal</div>
                </RouterLink>
                <RouterLink to="/admin/items">
                    <div class="pl-4 pr-10 py-2 text-white hover:bg-white hover:text-cyan-700 hover:rounded-l-3xl">Termékek</div>
                </RouterLink>
                    <RouterLink to="/admin/new-product">
                        <div class="ml-8 pl-2 pr-10 py-2 text-white text-sm hover:bg-white hover:text-cyan-700 hover:rounded-l-3xl">Új termék hozzáadása</div>
                    </RouterLink>
                <RouterLink to="/admin/categories">
                    <div class="pl-4 pr-10 py-2 text-white hover:bg-white hover:text-cyan-700 hover:rounded-l-3xl">Kategóriák</div>
                </RouterLink>
                    <RouterLink to="/admin/new-category">
                        <div class="ml-8 pl-2 pr-10 py-2 text-white text-sm hover:bg-white hover:text-cyan-700 hover:rounded-l-3xl">Új kategória hozzáadása</div>
                    </RouterLink>
                <RouterLink to="/admin/users">
                    <div class="pl-4 pr-10 py-2 text-white hover:bg-white hover:text-cyan-700 hover:rounded-l-3xl">Felhasználók</div>
                </RouterLink>
                <RouterLink to="/admin/orders">
                    <div class="pl-4 pr-10 py-2 text-white hover:bg-white hover:text-cyan-700 hover:rounded-l-3xl">Rendelések</div>
                </RouterLink>
            </div>

            <div class="absolute inset-x-0 bottom-0">
                <div @click="logout" class="text-center mb-4 mx-5 flex justify-between items-center px-2 py-2 text-white hover:bg-white hover:text-cyan-700 hover:cursor-pointer hover:rounded-3xl">
                    <div>Kijelentkezés</div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </div>
                </div>
                <div class="flex items-center px-6 py-4 bg-cyan-600">
                    <img src="https://picsum.photos/40/40" class="rounded-full">
                    <div class="ml-2">
                        <div class="-mb-2">{{ user.name }}</div>
                        <span class="text-sm text-gray-200">{{ user.email }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    a.router-link-exact-active div{
        background-color: white;
        color: theme('colors.cyan.700');
        border-top-left-radius: 1.5rem;
        border-bottom-left-radius: 1.5rem;
        cursor: default;
    }

    a.router-link-exact-active {
        cursor: default;
    }
</style>