<script>
import store from "../store"
import { useRouter } from "vue-router";
import { reactive, ref, computed } from "vue";
import useValidate from "@vuelidate/core";
import { required, minLength, sameAs, email } from "@vuelidate/validators";

export default {
    setup() {

        const router = useRouter();
        const user = reactive ({
            name: '',
            email: '',
            password: '',
            password_confirmation: ''
        })

        const rules = computed(() => {
            return {
                name: { required, minLength: minLength(8) },
                email: { required, email },
                password: { required, minLength: minLength(8) },
                password_confirmation: { required, sameAs: sameAs(user.password) },
            }
        })

        const v$ = useValidate(rules, user)

        function register() {
            this.v$.$validate()
            if (!this.v$.$error) {
                store
                    .dispatch('register', user)
                    .then(() => {
                        router.push({
                            name: 'LoginPage'
                        })
                    })
            }
        }

        return {
            user,
            v$,
            register
        }
    },
}
</script>

<template>
    <div class="flex items-center justify-center h-screen bg-gray-100">
        <div class="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-md">
            <!-- logo -->
            <h3 class="text-2xl font-bold text-center">Regisztráció</h3>
                <div class="mt-4">
                    <div>
                        <label for="username" class="block">Felhasználónév</label>
                        <input id="username" name="name" type="text" placeholder="Felhasználónév" v-model="user.name" class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600">
                    </div>
                    <div v-if="v$.name.$error" class="flex items-center justify-between py-2 px-5 mt-2 bg-red-500 text-white rounded">
                        
                            {{ v$.name.$errors[0].$message }}
                        
                        <span @click="v$.name.$error = false">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 flex items-center justify-center rounded-full transition-all cursor-pointer hover:rotate-90 hover:bg-[rgba(0,0,0,0.2)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </span>
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
                        <button @click="register" class="px-32 py-2 mt-4 w-full text-white bg-pink-600 rounded-lg hover:bg-pink-900">Regisztráció</button>
                    </div>
                </div>
        </div>
    </div>
</template>