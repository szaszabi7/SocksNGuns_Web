<script setup>
import store from "../store"
import { useRouter } from "vue-router";

    const router = useRouter();
    const user = {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    };

    function register(ev) {
        ev.preventDefault();
        store
            .dispatch('register', user)
            .then(() => {
                router.push({
                    name: 'LoginPage'
                })
            })
    }
</script>

<template>
    <div class="flex items-center justify-center h-screen bg-gray-100">
        <div class="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-md">
            <!-- logo -->
            <h3 class="text-2xl font-bold text-center">Regisztráció</h3>
            <form @submit="register">
                <div class="mt-4">
                    <div>
                        <label for="username" class="block">Felhasználónév</label>
                        <input id="username" name="name" type="text" placeholder="Felhasználónév" v-model="user.name" class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600">
                    </div>
                    <div class="mt-4">
                        <label for="email-address" class="block">Email</label>
                        <input id="email-address" type="email" name="email" v-model="user.email" placeholder="Email" class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600">
                    </div>
                    <div class="mt-4">
                        <label for="password" class="block">Jelszó</label>
                        <input id="password" type="password" name="password" v-model="user.password" placeholder="Jelszó" class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600">
                    </div>
                    <div class="mt-4">
                        <label for="password_confirmation" class="block">Jelszó újra</label>
                        <input id="password_confirmation" type="password" name="password_confirmation" v-model="user.password_confirmation" placeholder="Jelszó újra" class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600">
                    </div>
                    <div class="justify-center">
                        <button type="submit" class="px-32 py-2 mt-4 w-full text-white bg-pink-600 rounded-lg hover:bg-pink-900">Regisztráció</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>