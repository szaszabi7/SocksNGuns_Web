<script>
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import CartItem from "../components/CartItem.vue";
import store from "../store";
import { computed } from "@vue/reactivity";

    export default {
        setup() {

            const items = computed(() => store.getters.cartItems)

            return {
                items
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
                    <div class="border border-black py-32 text-center">
                        összegzés
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>