<script>
import { RouterLink } from 'vue-router';
import store from '../store';
import { useRouter } from 'vue-router';
import { reactive, ref, computed } from 'vue';
import useValidate from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";

export default{
    setup() {
        const router = useRouter();

        const user = reactive({
            email: '',
            password: ''
        })

        let errorMessage = ref('')

        let showPass = ref(false);
        const togglePass = () => (showPass.value = !showPass.value);

        const rules = computed(() => {
            return {
                email: { 
                    required: helpers.withMessage("Email cím megadása kötelező", required),
                    email: helpers.withMessage("Nem megfelelő email formátum", email),
                },
                password: { 
                    required: helpers.withMessage("Jelszó megadása kötelező", required)
                }
            }
        })

        const v$ = useValidate(rules, user)

        function login() {
            this.v$.$validate()
            if (!this.v$.$error) {
                store.dispatch('login', user)
                    .then(() => {
                        router.push({
                            name: 'HomePage'
                        })
                    })
                    .catch(err => {
                        if (err.response.status == 401) {
                            errorMessage.value = err.response.data.message
                        }
                    })
            }
        }

        return {
            user,
            v$,
            login,
            errorMessage,
            showPass,
            togglePass,
        }
    },
    components: { RouterLink }
}
</script>

<template>
    <div class="flex items-center justify-center h-screen bg-gray-100">
        <div class="px-8 py-6 text-left bg-white shadow-lg rounded-md">
            <div class="mb-4">
                <img :src="'/snglogo.png'" class="w-44  mx-auto">
                <h1 class="text-3xl text-center">Socks&Guns</h1>
            </div>
            <h3 class="text-2xl font-bold text-center">Bejelentkezés</h3>
                <div class="mt-4">
                    <div>
                        <label for="email-address" class="block">Email cím</label>
                        <input id="email-address" name="email" type="email" placeholder="Email cím" v-model="user.email" @keyup.enter="login" class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600">
                    </div>
                    <div v-if="v$.email.$error" class="flex items-center justify-between py-2 px-5 mt-2 bg-red-500 text-white rounded">
                        {{ v$.email.$errors[0].$message }}
                    </div>
                    <div class="mt-4">
                        <label for="password" class="block">Jelszó</label>
                        <div class="flex items-center mt-2">
                            <input id="password" name="password" v-model="user.password" placeholder="Jelszó" @keyup.enter="login"  :type="showPass ? 'text' : 'password'" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600">
                            <div v-if="!showPass">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mx-3" viewBox="0 0 20 20" fill="currentColor" @mousedown="togglePass">
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                    <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                                </svg>
                            </div>
                            <div v-else>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mx-3" viewBox="0 0 20 20" fill="currentColor" @mouseup="togglePass">
                                    <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd" />
                                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div v-if="v$.password.$error" class="flex items-center justify-between py-2 px-5 mt-2 bg-red-500 text-white rounded">
                        {{ v$.password.$errors[0].$message }}
                    </div>
                    <div v-if="errorMessage" class="flex items-center justify-between py-2 px-5 mt-4 bg-red-500 text-white rounded">
                        {{ errorMessage}}
                        <span @click="errorMessage = ''">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 flex items-center justify-center rounded-full transition-all cursor-pointer hover:rotate-90 hover:bg-[rgba(0,0,0,0.2)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </span>
                    </div>
                    <div class="flex items-baseline justify-between">
                        <button @click="login" class="px-6 py-2 mt-4 mr-28 text-white bg-pink-600 rounded-lg hover:bg-pink-900">Bejelentkezés</button>
                        <a href="#" class="text-sm text-pink-600 hover:underline">Elfelejtett jelszó?</a>
                    </div>
                    <RouterLink to="/register">
                        <div class="justify-center">
                            <button class="px-6 py-2 mt-4 w-full text-white bg-rose-700 rounded-lg hover:bg-rose-900">Regisztráció</button>
                        </div>
                    </RouterLink>
                </div>
        </div>
    </div>
</template>