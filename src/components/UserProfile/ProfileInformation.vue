<script>
import { useStore } from 'vuex';
import { computed, onMounted, reactive, ref } from 'vue';
import axiosClient from "../../axios";
import useValidate from "@vuelidate/core";
import { required, minLength, sameAs, helpers } from '@vuelidate/validators';

    export default {
        setup() {
            const store = useStore()

            function userGet() {
                store.dispatch('getUser')
            }
    
            onMounted(userGet)

            let showPassEdit = ref(false);
            const togglePassEdit = () => (showPassEdit.value = !showPassEdit.value);

            let showPass = ref(false);
            const togglePass = () => (showPass.value = !showPass.value);
            let showPassConfirmation = ref(false);
            const togglePassConfirmation = () => (showPassConfirmation.value = !showPassConfirmation.value);

            const newPassword = reactive ({
                password: '',
                password_confirmation: ''
            })

            const rules = computed(() => {
                return {
                    password: { 
                        required: helpers.withMessage("Jelszó megadása kötelező", required),
                        minLength: helpers.withMessage("A jelszónak minimum 8 karakternek kell lennie", minLength(8)) 
                    },
                    password_confirmation: {
                        sameAs: helpers.withMessage("A két jelszónak meg kell egyeznie", sameAs(newPassword.password))
                    },
                }
            })

            const v$ = useValidate(rules, newPassword)

            let success = ref('')

            function changePassword() {
                this.v$.$validate()
                if (!this.v$.$error) {
                    axiosClient.put('/change_password', newPassword)
                    .then(reset())
                    .then((response) => {
                        if (response.status == 200) {
                            success.value = response.data.message
                        }
                    })
                    this.v$.$reset()
                }
            }

            function reset() {
                newPassword.password = ''
                newPassword.password_confirmation = ''
                showPass.value = false
                togglePassEdit()
            }
    
            return {
                user: computed(() => store.getters.user),
                showPassEdit,
                togglePassEdit,
                newPassword,
                showPass,
                togglePass,
                showPassConfirmation,
                togglePassConfirmation,
                changePassword,
                v$,
                success
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
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" @click="togglePassEdit" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                </label>
                <div v-if="success" class="flex items-center justify-between py-2 px-5 mt-4 bg-green-600 text-white rounded">
                        {{ success }}
                        <span @click="success = ''">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 flex items-center justify-center rounded-full transition-all cursor-pointer hover:rotate-90 hover:bg-[rgba(0,0,0,0.2)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </span>
                    </div>
                <div :class="showPassEdit ? 'block' : 'hidden'">
                    <div class="mt-4">
                        <label for="password" class="block">Jelszó</label>
                        <div class="flex items-center mt-2">
                            <input id="password" name="password" v-model="newPassword.password" @keyup.enter="register" placeholder="Jelszó" :type="showPass ? 'text' : 'password'" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600">
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
                    <div class="mt-4">
                        <label for="password_confirmation" class="block">Jelszó újra</label>
                        <div class="flex items-center mt-2">
                            <input id="password_confirmation" name="password_confirmation" v-model="newPassword.password_confirmation" @keyup.enter="register" :type="showPassConfirmation ? 'text' : 'password'" placeholder="Jelszó újra" class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600">
                            <div v-if="!showPassConfirmation">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mx-3" viewBox="0 0 20 20" fill="currentColor" @mousedown="togglePassConfirmation">
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                    <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                                </svg>
                            </div>
                            <div v-else>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mx-3" viewBox="0 0 20 20" fill="currentColor" @mouseup="togglePassConfirmation">
                                    <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd" />
                                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div v-if="v$.password_confirmation.$error" class="flex items-center justify-between py-2 px-5 mt-2 bg-red-500 text-white rounded">
                        {{ v$.password_confirmation.$errors[0].$message }}
                    </div>
                    <div class="justify-center w-fit mx-auto">
                        <button @click="changePassword" class="px-20 py-2 mt-4 text-white bg-pink-600 rounded-lg hover:bg-pink-900">Jelszó megvátoztatása</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>