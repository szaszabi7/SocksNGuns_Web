<script>
import { computed } from "@vue/reactivity";
import useVuelidate from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import { onMounted, ref, reactive } from "vue";
import { useStore } from "vuex";
import usePersonalInformations from "../../composables/personalInformation";
    export default {
        setup() {
            const { pInfo, success, getPersonalInformation, newPersonalInformation, updatePersonalInformation, destroyPersonalInformation } = usePersonalInformations()

            const store = useStore()

            onMounted(getPersonalInformation(), userGet())

            let showEdit = ref(false);
            const toggleEdit = () => (showEdit.value = !showEdit.value);

            function userGet() {
                store.dispatch('getUser')
            }

            const user = computed(() => store.getters.user)

            let showNewInfo = ref(false);
            const toggleNewInfo = () => (showNewInfo.value = !showNewInfo.value, newInfo.user_id = user.value.id);

            const rules = computed(() => {
                return {
                    full_name: { 
                        required: helpers.withMessage("Név megadása kötelező", required)
                    },
                    phone_number: {
                        required: helpers.withMessage("Telefonszám megadása kötelező", required)
                    },
                    address: {
                        required: helpers.withMessage("Cím megadása kötelező", required)
                    },
                    post_code: {
                        required: helpers.withMessage("Irányítószám megadása kötelező", required)
                    },
                    city: {
                        required: helpers.withMessage("Város megadása kötelező", required)
                    },
                    user_id: {
                        required: helpers.withMessage("User id megadása kötelező", required)
                    },
                }
            })

            const v$ = useVuelidate(rules, pInfo)

            function saveInfo() {
                this.v$.$validate()
                if (!this.v$.$error) {
                    updatePersonalInformation(pInfo.value.id, pInfo.value)
                    .then(showEdit.value = false)
                }
            }

            const newInfo = reactive({
                'full_name' : '',
                'phone_number' : '',
                'address' : '',
                'post_code' : '',
                'city' : '',
                'user_id': ''
            })

            const vNew$ = useVuelidate(rules, newInfo)

            function saveNewInfo () {
                this.vNew$.$validate()
                if (!this.vNew$.$error) {
                    newPersonalInformation({...newInfo})
                    .then(showNewInfo.value = false)
                    .then(getPersonalInformation)
                }
            }
        
            return {
                pInfo,
                showEdit,
                toggleEdit,
                v$,
                success,
                saveInfo,
                showNewInfo,
                toggleNewInfo,
                newInfo,
                vNew$,
                saveNewInfo
            }
        }
    }
</script>

<template>
    <div class="w-full bg-white rounded-r-md">
        <div class="py-6 px-10">
            <div class="grid grid-cols-2">
                <div class="pr-6">
                    <label for="full_name" class="inline-flex items-center text-lg border-b-2 border-pink-500">
                        Vezetéknév és keresztnév
                    </label>
                    <p class="my-4" :class="showEdit ? 'hidden' : 'block'">{{ pInfo.full_name }}</p>
                    <input type="text" name="full_name" v-model="pInfo.full_name" :class="showEdit ? 'block' : 'hidden'" @keyup.enter="saveInfo" placeholder="Vezetéknév és keresztnév" class="w-full my-2 px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600">
                    <input type="text" name="full_name" v-model="newInfo.full_name" :class="showNewInfo ? 'block' : 'hidden'" @keyup.enter="saveInfo" placeholder="Vezetéknév és keresztnév" class="w-full my-2 px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600">
                    <div v-if="v$.full_name.$error" class="flex items-center justify-between py-2 px-5 my-2 bg-red-500 text-white rounded">
                        {{ v$.full_name.$errors[0].$message }}
                    </div>
                </div>
                <div class="pr-6">
                    <label for="phone_number" class="inline-flex items-center text-lg border-b-2 border-pink-500">
                        Telefonszám
                    </label>
                    <p class="my-4" :class="showEdit ? 'hidden' : 'block'">{{ pInfo.phone_number }}</p>
                    <input type="text" name="phone_number" v-model="pInfo.phone_number" :class="showEdit ? 'block' : 'hidden'" @keyup.enter="saveInfo" placeholder="Telefonszám" class="w-full my-2 px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600">
                    <input type="text" name="phone_number" v-model="newInfo.phone_number" :class="showNewInfo ? 'block' : 'hidden'" @keyup.enter="saveInfo" placeholder="Telefonszám" class="w-full my-2 px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600">
                    <div v-if="v$.phone_number.$error" class="flex items-center justify-between py-2 px-5 my-2 bg-red-500 text-white rounded">
                        {{ v$.phone_numberí.$errors[0].$message }}
                    </div>
                </div>
                <div class="pr-6">
                    <label for="address" class="inline-flex items-center text-lg border-b-2 border-pink-500">
                        Teljes cím
                    </label>
                    <p class="my-4" :class="showEdit ? 'hidden' : 'block'">{{ pInfo.address }}</p>
                    <input type="text" name="address" v-model="pInfo.address" :class="showEdit ? 'block' : 'hidden'" @keyup.enter="saveInfo" placeholder="Teljes cím" class="w-full my-2 px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"> 
                    <input type="text" name="address" v-model="newInfo.address" :class="showNewInfo ? 'block' : 'hidden'" @keyup.enter="saveInfo" placeholder="Teljes cím" class="w-full my-2 px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"> 
                    <div v-if="v$.address.$error" class="flex items-center justify-between py-2 px-5 my-2 bg-red-500 text-white rounded">
                        {{ v$.address.$errors[0].$message }}
                    </div>
                </div>
                <div class="pr-6">
                    <label for="post_code" class="inline-flex items-center text-lg border-b-2 border-pink-500">
                        Irányítószám
                    </label>
                    <p class="my-4" :class="showEdit ? 'hidden' : 'block'">{{ pInfo.post_code }}</p>
                    <input type="text" name="post_code" v-model="pInfo.post_code" :class="showEdit ? 'block' : 'hidden'" @keyup.enter="saveInfo" placeholder="Irányítószám" class="w-full my-2 px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600">
                    <input type="text" name="post_code" v-model="newInfo.post_code" :class="showNewInfo ? 'block' : 'hidden'" @keyup.enter="saveInfo" placeholder="Irányítószám" class="w-full my-2 px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600">
                    <div v-if="v$.post_code.$error" class="flex items-center justify-between py-2 px-5 my-2 bg-red-500 text-white rounded">
                        {{ v$.post_code.$errors[0].$message }}
                    </div>
                </div>
                <div class="pr-6">
                    <label for="city" class="inline-flex items-center text-lg border-b-2 border-pink-500">
                        Város
                    </label>
                    <p class="my-4" :class="showEdit ? 'hidden' : 'block'">{{ pInfo.city }}</p>
                    <input type="text" name="city" v-model="pInfo.city" :class="showEdit ? 'block' : 'hidden'" @keyup.enter="saveInfo" placeholder="Város" class="w-full my-2 px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600">
                    <input type="text" name="city" v-model="newInfo.city" :class="showNewInfo ? 'block' : 'hidden'" @keyup.enter="saveInfo" placeholder="Város" class="w-full my-2 px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600">
                    <div v-if="v$.city.$error" class="flex items-center justify-between py-2 px-5 my-2 bg-red-500 text-white rounded">
                        {{ v$.city.$errors[0].$message }}
                    </div>
                </div>
            </div>
            <div v-if="success" class="flex items-center justify-between py-2 px-5 bg-green-600 text-white rounded">
                    {{ success }}
                    <span @click="success = ''">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 flex items-center justify-center rounded-full transition-all cursor-pointer hover:rotate-90 hover:bg-[rgba(0,0,0,0.2)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </span>
                </div>
            <div>
                <div v-if="!pInfo.length">
                    <button @click="toggleNewInfo" v-if="!showNewInfo" class="px-12 py-2 mt-4 text-white bg-pink-600 rounded-lg hover:bg-pink-900">Új adatok felvétele</button>
                    <button @click="saveNewInfo" v-else class="px-12 py-2 mt-4 text-white bg-pink-600 rounded-lg hover:bg-pink-900">Új adatok mentése</button>
                </div>
                <div v-else>
                    <button @click="toggleEdit" v-if="!showEdit" class="px-12 py-2 mt-4 text-white bg-pink-600 rounded-lg hover:bg-pink-900">Adatok szerkesztése</button>
                    <button @click="saveInfo" v-else class="px-12 py-2 mt-4 text-white bg-pink-600 rounded-lg hover:bg-pink-900">Adatok mentése</button>
                </div>
            </div>
        </div>
    </div>
</template>