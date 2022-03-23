<script setup>
import { RouterLink } from 'vue-router';
import store from '../store';
import { useRouter } from 'vue-router';

    const router = useRouter();

    const user = {
        email: '',
        password: ''
    }

    function login(ev) {
        ev.preventDefault();
        store.dispatch('login', user)
            .then(() => {
                router.push({
                    name: 'HomePage'
                })
            })
    }
</script>

<template>
    <div class="flex items-center justify-center h-screen bg-gray-100">
        <div class="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-md">
            <!-- logo -->
            <h3 class="text-2xl font-bold text-center">Bejelentkezés</h3>
            <form @submit="login">
                <div class="mt-4">
                    <div>
                        <label for="email-address" class="block">Email vagy felhasználónév</label>
                        <input id="email-address" name="email" type="text" placeholder="Email vagy felhasználónév" v-model="user.email" class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600">
                    </div>
                    <div class="mt-4">
                        <label for="password" class="block">Jelszó</label>
                        <input id="password" name="password" type="password" placeholder="Jelszó" v-model="user.password" class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600">
                    </div>
                    <div class="flex items-baseline justify-between">
                        <button class="px-6 py-2 mt-4 mr-28 text-white bg-pink-600 rounded-lg hover:bg-pink-900">Bejelentkezés</button>
                        <a href="#" class="text-sm text-pink-600 hover:underline">Elfelejtett jelszó?</a>
                    </div>
                    <RouterLink to="/register">
                        <div class="justify-center">
                            <button class="px-6 py-2 mt-4 w-full text-white bg-rose-700 rounded-lg hover:bg-rose-900">Regisztráció</button>
                        </div>
                    </RouterLink>
                </div>
            </form>
        </div>
    </div>
</template>