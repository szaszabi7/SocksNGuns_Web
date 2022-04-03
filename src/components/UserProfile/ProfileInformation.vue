<script>
import { useStore } from 'vuex';
import { computed, onMounted, reactive } from 'vue';

    export default {
        setup() {
            const store = useStore()

            function userGet() {
                store.dispatch('getUser')
            }
    
            onMounted(userGet)

            const editedUser = reactive ({
                
            })
    
            return {
                editedUser,
                user: computed(() => store.getters.user)
            }
        }
    }
    
</script>

<template>
    <div class="w-full bg-white rounded-r-md">
        <div class="py-6 px-10">
            <div>
                <label for="email-address" class="inline-flex items-center text-lg border-b-2 border-pink-500 mb-2">
                    Email cím
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                </label>
                <p>{{ user.email }}</p>
                <input id="email-address" name="email" type="text" class="hidden w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600">
            </div>
            <div class="mt-4">
                <label for="username" class="inline-flex items-center text-lg border-b-2 border-pink-500 mb-2">
                    Felhasználónév
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                </label>
                <p>{{ user.name }}</p>
                <input id="username" name="username" type="text" class="hidden w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600">
            </div>
            <div class="mt-4">
                <label for="password" class="inline-flex items-center text-lg border-b-2 border-pink-500 mb-2">
                    Jelszó megváltoztatása
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                </label>
                <!-- password, password_confirmation input dropdown-->
            </div>
        </div>
    </div>
</template>