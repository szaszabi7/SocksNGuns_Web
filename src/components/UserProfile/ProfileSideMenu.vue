<script>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useStore } from 'vuex';

    export default {
        setup() {
            const store = useStore()

            let isAdmin = ref(false)

            if (store.state.user.data.is_admin == 1) {
                isAdmin.value = true;
            }

            return {
                isAdmin
            }
        },
        components: { RouterLink }
    }
</script>

<template>
    <div class="w-full bg-pink-500 md:rounded-l-2xl">
        <div class="py-6 pl-6 h-full flex flex-col gap-2">
            <div class="grow">
                <RouterLink to="/user/profile" >
                    <div class="pl-4 pr-10 py-2 text-white hover:bg-white hover:text-pink-500 hover:rounded-l-3xl">Profil</div>
                </RouterLink>
                <RouterLink to="/user/delivery_address">
                    <div class="pl-4 pr-10 py-2 text-white hover:bg-white hover:text-pink-500 hover:rounded-l-3xl">Szállítási adatok</div>
                </RouterLink>
                <RouterLink to="/user/orders">
                    <div class="pl-4 pr-10 py-2 text-white hover:bg-white hover:text-pink-500 hover:rounded-l-3xl">Rendelések</div>
                </RouterLink>
            </div>
            <RouterLink to="/admin" v-if="isAdmin">
                <div class="text-center mb-4 mr-5 flex justify-between items-center px-2 py-2 text-white hover:bg-white hover:text-pink-500 hover:rounded-3xl">
                    <div>Admin központ</div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </div>
                </div>
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