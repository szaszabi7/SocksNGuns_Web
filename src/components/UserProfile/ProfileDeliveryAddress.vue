<script>
import { computed } from "@vue/reactivity";
import { onMounted, ref, reactive } from "vue";
import { useStore } from "vuex";
import usePersonalInformations from "../../composables/personalInformation";
    export default {
        setup() {
            const { pInfo, success, hasData, getPersonalInformation, newPersonalInformation, updatePersonalInformation, destroyPersonalInformation } = usePersonalInformations()

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

            let errorMessage = ref([])

            function saveInfo() {
                updatePersonalInformation(pInfo.value[0].id, pInfo.value[0])
                .catch(err => {
                    if (err.response.status == 422) {
                        errorMessage.value = err.response.data.errors
                    }
                })
                .then(() => {
                    if (success.value != "") {
                        showEdit.value = false
                    }
                })
            }

            function reset() {
                newInfo.full_name = '',
                newInfo.phone_number = '',
                newInfo.address = '',
                newInfo.post_code = '',
                newInfo.city = '',
                newInfo.user_id = ''
            }

            const newInfo = reactive({
                full_name: '',
                phone_number: '',
                address: '',
                post_code: '',
                city: '',
                user_id: ''
            })

            function saveNewInfo () {
                newPersonalInformation({...newInfo})
                .catch(err => {
                    if (err.response.status == 422) {
                        errorMessage.value = err.response.data.errors
                    }
                })
                .then(() => {
                    if (success.value != "") {
                        showNewInfo.value = false
                        reset()
                        getPersonalInformation()
                    }
                })
            }

            const deleteInfo = async (id) => {
                if (!window.confirm("Bitzos törölni akarod az adatokat?")) {
                    return
                }

                await destroyPersonalInformation(id);
                await getPersonalInformation();
            }

            function cancelEdit() {
                showEdit.value = false
                getPersonalInformation()
            }

            function cancelNew() {
                showNewInfo.value = false
                reset()
            }
        
            return {
                showEdit,
                toggleEdit,
                success,
                saveInfo,
                showNewInfo,
                toggleNewInfo,
                newInfo,
                saveNewInfo,
                deleteInfo,
                hasData,
                pInfo,
                errorMessage,
                cancelEdit,
                cancelNew
            }
        }
    }
</script>

<template>
    <div class="w-full bg-white rounded-r-md">
        <div class="py-6 px-10">
            <div class="grid grid-cols-2" v-for="pI in pInfo">
                <div class="pr-6">
                    <label for="full_name" class="inline-flex items-center text-lg border-b-2 border-pink-500">
                        Vezetéknév és keresztnév
                    </label>
                    <p class="my-4" :class="showEdit ? 'hidden' : 'block'">{{ pI.full_name }}</p>
                    <input type="text" name="full_name" v-model="pI.full_name" :class="showEdit ? 'block' : 'hidden'" @keyup.enter="saveInfo" placeholder="Vezetéknév és keresztnév" class="w-full my-2 px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600">
                    <div v-if="errorMessage.full_name" class="flex items-center justify-between py-2 px-5 my-2 bg-red-500 text-white rounded">
                        {{ errorMessage.full_name[0] }}
                        <span @click="errorMessage.full_name = ''">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 flex items-center justify-center rounded-full transition-all cursor-pointer hover:rotate-90 hover:bg-[rgba(0,0,0,0.2)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </span>
                    </div>
                </div>
                <div class="pr-6">
                    <label for="phone_number" class="inline-flex items-center text-lg border-b-2 border-pink-500">
                        Telefonszám
                    </label>
                    <p class="my-4" :class="showEdit ? 'hidden' : 'block'">{{ pI.phone_number }}</p>
                    <input type="text" name="phone_number" v-model="pI.phone_number" :class="showEdit ? 'block' : 'hidden'" @keyup.enter="saveInfo" placeholder="Telefonszám" class="w-full my-2 px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600">
                    <div v-if="errorMessage.phone_number" class="flex items-center justify-between py-2 px-5 my-2 bg-red-500 text-white rounded">
                        {{ errorMessage.phone_number[0] }}
                        <span @click="errorMessage.phone_number = ''">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 flex items-center justify-center rounded-full transition-all cursor-pointer hover:rotate-90 hover:bg-[rgba(0,0,0,0.2)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </span>
                    </div>
                </div>
                <div class="pr-6">
                    <label for="address" class="inline-flex items-center text-lg border-b-2 border-pink-500">
                        Teljes cím
                    </label>
                    <p class="my-4" :class="showEdit ? 'hidden' : 'block'">{{ pI.address }}</p>
                    <input type="text" name="address" v-model="pI.address" :class="showEdit ? 'block' : 'hidden'" @keyup.enter="saveInfo" placeholder="Teljes cím" class="w-full my-2 px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"> 
                    <div v-if="errorMessage.address" class="flex items-center justify-between py-2 px-5 my-2 bg-red-500 text-white rounded">
                        {{ errorMessage.address[0] }}
                        <span @click="errorMessage.address = ''">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 flex items-center justify-center rounded-full transition-all cursor-pointer hover:rotate-90 hover:bg-[rgba(0,0,0,0.2)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </span>
                    </div>
                </div>
                <div class="pr-6">
                    <label for="post_code" class="inline-flex items-center text-lg border-b-2 border-pink-500">
                        Irányítószám
                    </label>
                    <p class="my-4" :class="showEdit ? 'hidden' : 'block'">{{ pI.post_code }}</p>
                    <input type="text" name="post_code" v-model="pI.post_code" :class="showEdit ? 'block' : 'hidden'" @keyup.enter="saveInfo" placeholder="Irányítószám" class="w-full my-2 px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600">
                    <div v-if="errorMessage.post_code" class="flex items-center justify-between py-2 px-5 my-2 bg-red-500 text-white rounded">
                        {{ errorMessage.post_code[0] }}
                        <span @click="errorMessage.post_code = ''">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 flex items-center justify-center rounded-full transition-all cursor-pointer hover:rotate-90 hover:bg-[rgba(0,0,0,0.2)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </span>
                    </div>
                </div>
                <div class="pr-6">
                    <label for="city" class="inline-flex items-center text-lg border-b-2 border-pink-500">
                        Város
                    </label>
                    <p class="my-4" :class="showEdit ? 'hidden' : 'block'">{{ pI.city }}</p>
                    <input type="text" name="city" v-model="pI.city" :class="showEdit ? 'block' : 'hidden'" @keyup.enter="saveInfo" placeholder="Város" class="w-full my-2 px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600">
                    <div v-if="errorMessage.city" class="flex items-center justify-between py-2 px-5 my-2 bg-red-500 text-white rounded">
                        {{ errorMessage.city[0] }}
                        <span @click="errorMessage.city = ''">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 flex items-center justify-center rounded-full transition-all cursor-pointer hover:rotate-90 hover:bg-[rgba(0,0,0,0.2)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-2" :class="showNewInfo ? 'block' : 'hidden'">
                <div class="pr-6">
                    <label for="full_name" class="inline-flex items-center text-lg border-b-2 border-pink-500">
                        Vezetéknév és keresztnév
                    </label>
                    <input type="text" name="full_name" v-model="newInfo.full_name" :class="showNewInfo ? 'block' : 'hidden'" @keyup.enter="saveInfo" placeholder="Vezetéknév és keresztnév" class="w-full my-2 px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600">
                    <div v-if="errorMessage.full_name" class="flex items-center justify-between py-2 px-5 my-2 bg-red-500 text-white rounded">
                        {{ errorMessage.full_name[0] }}
                        <span @click="errorMessage.full_name = ''">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 flex items-center justify-center rounded-full transition-all cursor-pointer hover:rotate-90 hover:bg-[rgba(0,0,0,0.2)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </span>
                    </div>
                </div>
                <div class="pr-6">
                    <label for="phone_number" class="inline-flex items-center text-lg border-b-2 border-pink-500">
                        Telefonszám
                    </label>
                    <input type="text" name="phone_number" v-model="newInfo.phone_number" :class="showNewInfo ? 'block' : 'hidden'" @keyup.enter="saveInfo" placeholder="Telefonszám" class="w-full my-2 px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600">
                    <div v-if="errorMessage.phone_number" class="flex items-center justify-between py-2 px-5 my-2 bg-red-500 text-white rounded">
                        {{ errorMessage.phone_number[0] }}
                        <span @click="errorMessage.phone_number = ''">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 flex items-center justify-center rounded-full transition-all cursor-pointer hover:rotate-90 hover:bg-[rgba(0,0,0,0.2)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </span>
                    </div>
                </div>
                <div class="pr-6">
                    <label for="address" class="inline-flex items-center text-lg border-b-2 border-pink-500">
                        Teljes cím
                    </label>
                    <input type="text" name="address" v-model="newInfo.address" :class="showNewInfo ? 'block' : 'hidden'" @keyup.enter="saveInfo" placeholder="Teljes cím" class="w-full my-2 px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"> 
                    <div v-if="errorMessage.address" class="flex items-center justify-between py-2 px-5 my-2 bg-red-500 text-white rounded">
                        {{ errorMessage.address[0] }}
                        <span @click="errorMessage.address = ''">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 flex items-center justify-center rounded-full transition-all cursor-pointer hover:rotate-90 hover:bg-[rgba(0,0,0,0.2)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </span>
                    </div>
                </div>
                <div class="pr-6">
                    <label for="post_code" class="inline-flex items-center text-lg border-b-2 border-pink-500">
                        Irányítószám
                    </label>
                    <input type="text" name="post_code" v-model="newInfo.post_code" :class="showNewInfo ? 'block' : 'hidden'" @keyup.enter="saveInfo" placeholder="Irányítószám" class="w-full my-2 px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600">
                    <div v-if="errorMessage.post_code" class="flex items-center justify-between py-2 px-5 my-2 bg-red-500 text-white rounded">
                        {{ errorMessage.post_code[0] }}
                        <span @click="errorMessage.post_code = ''">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 flex items-center justify-center rounded-full transition-all cursor-pointer hover:rotate-90 hover:bg-[rgba(0,0,0,0.2)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </span>
                    </div>
                </div>
                <div class="pr-6">
                    <label for="city" class="inline-flex items-center text-lg border-b-2 border-pink-500">
                        Város
                    </label>
                    <input type="text" name="city" v-model="newInfo.city" :class="showNewInfo ? 'block' : 'hidden'" @keyup.enter="saveInfo" placeholder="Város" class="w-full my-2 px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600">
                    <div v-if="errorMessage.city" class="flex items-center justify-between py-2 px-5 my-2 bg-red-500 text-white rounded">
                        {{ errorMessage.city[0] }}
                        <span @click="errorMessage.city = ''">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 flex items-center justify-center rounded-full transition-all cursor-pointer hover:rotate-90 hover:bg-[rgba(0,0,0,0.2)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </span>
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
                <div v-if="!hasData">
                    <div class="text-pink-500 font-bold" v-if="!showNewInfo">
                        Még nem adtál meg adatot
                    </div>
                    <button @click="toggleNewInfo" v-if="!showNewInfo" class="px-12 py-2 mt-4 text-white bg-pink-600 rounded-lg hover:bg-pink-900">Új adatok felvétele</button>
                    <div class="flex" v-else>
                        <button @click="saveNewInfo" class="px-12 py-2 mt-4 mr-4 text-white bg-pink-600 rounded-lg hover:bg-pink-900">Új adatok mentése</button>
                        <button @click="cancelNew" class="px-12 py-2 mt-4 text-white bg-red-600 rounded-lg hover:bg-red-900">Mégse</button>
                    </div>

                </div>
                <div v-else>
                    <div class="flex" v-if="!showEdit">
                        <button @click="toggleEdit" class="px-12 py-2 mt-4 text-white bg-pink-600 rounded-lg hover:bg-pink-900">Adatok szerkesztése</button>
                        <button @click="deleteInfo(pInfo[0].id)" class="px-12 py-2 mt-4 ml-4 text-white bg-red-600 rounded-lg hover:bg-red-900">Adatok törlése</button>
                    </div>
                    <div class="flex" v-else>
                        <button @click="saveInfo" class="px-12 py-2 mt-4 mr-4 text-white bg-pink-600 rounded-lg hover:bg-pink-900">Adatok mentése</button>
                        <button @click="cancelEdit" class="px-12 py-2 mt-4 text-white bg-red-600 rounded-lg hover:bg-red-900">Mégse</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>