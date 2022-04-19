<script>
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import CartItem from "../components/CartItem.vue";
import store from "../store";
import { computed } from "@vue/reactivity";
import { ref } from "vue";
import axiosClient from "../axios";

    export default {
        setup() {

            const items = computed(() => store.getters.cartItems)
            const total_price = computed(() => store.getters.cartTotal)

            const orderItemData = ref([]);
            const orderResponse = ref([])
            const success = ref("")

            const placeOrder = async () => {
                await axiosClient.post('/orders', {"total_price": total_price.value})
                .then((response) => {
                    if (response.status == 201) {
                        orderResponse.value = response.data
                        orderItemData.value = store.getters.cartOrder(orderResponse.value[0].id)
                    }
                })
                await axiosClient.post('/order_items', orderItemData.value)
                .then((response) => {
                    if (response.status == 201) {
                        store.commit('emptyCart')
                        success.value = response.data.success
                    }
                })
            }

            return {
                items,
                total_price,
                placeOrder,
                success
            }
        },
        components: { Navbar, Footer, CartItem }
    }

</script>

<template>
    <div class="h-screen flex flex-col">
        <Navbar />
        <div class="container mx-auto px-10 pt-16 pb-10 grow">
            <h1 class="text-center text-4xl mb-4 font-bold">Kosár</h1>
            <h2 v-if="items.length === 0" class="text-center text-3xl">Üres a kosár</h2>
            <div v-else class="flex">
                <div class="flex flex-col gap-2 w-3/4">
                    <div class="flex">
                        <div class="w-2/5 text-center font-bold">Termék</div>
                        <div class="w-1/5 text-center font-bold">Darab</div>
                        <div class="w-1/5 text-center font-bold">Ár/db</div>
                        <div class="w-1/5 text-center font-bold">Teljes Ár</div>
                    </div>
                    <CartItem v-for="item in items" :key="item.id" :item="item"/>
                </div>
                <div class="w-1/4">
                    <div class="bg-slate-100 px-8 py-10 text-center">
                        <h1 class="font-semibold text-2xl border-b pb-2">Kosár összegzése</h1>
                        <div class="flex font-semibold justify-between py-6 text-sm uppercase">
                            <span>Teljes Összeg</span>
                            <span>{{ new Intl.NumberFormat().format(total_price) }} Ft</span>
                        </div>
                        <div class="border-t mt-8">
                            <button @click="placeOrder" class="bg-pink-600 font-semibold hover:bg-pink-900 py-3 text-sm text-white uppercase w-full">Rendelés leadása</button>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="success" class="flex items-center justify-between py-2 px-5 mt-4 w-1/2 mx-auto bg-green-600 text-white text-lg rounded">
                {{ success }}
                <span @click="success = ''">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 flex items-center justify-center rounded-full transition-all cursor-pointer hover:rotate-90 hover:bg-[rgba(0,0,0,0.2)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </span>
            </div>
        </div>
        <Footer />
    </div>
</template>