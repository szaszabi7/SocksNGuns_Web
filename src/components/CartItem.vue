<script>
import { computed } from '@vue/reactivity';
import { RouterLink } from 'vue-router';
import store from "../store";

    export default {
        props: {
            item: Object
        },
        setup(props) {

            function decreaseQuantity() {
                store.commit('decreaseQuantity', props.item)
            }

            function addToCart() {
                store.commit('addToCart', props.item)
            }

            function removeFromCart() {
                store.commit('removeFromCart', props.item)
            }

            const item_total = computed(() => { return props.item.price * store.getters.productQuantity(props.item)})

            return {
                decreaseQuantity,
                addToCart,
                removeFromCart,
                item_total
            }
        },
        components: { RouterLink }
    }
</script>

<template>
    <div class="flex items-center">
        <div class="w-1/5">
            <div class="w-44">
                <RouterLink :to="{ name: 'ProductPage', params: { id: item.id }}">
                    <img v-if="item.image" :src="item.image">
                    <img v-else :src="'/no_image_big.png'">
                </RouterLink>
            </div>
        </div>
        <div class="flex w-1/5 h-full py-2">
            <div class="flex flex-col justify-between ml-4 flex-grow">
                <div>
                    <span class="font-bold capitalize block">
                        <RouterLink :to="{ name: 'ProductPage', params: { id: item.id }}">
                            {{ item.name }}
                        </RouterLink>
                    </span>
                    <span>
                        {{ item.category.name }}
                    </span>
                </div>
                <div>
                    <span @click="removeFromCart" class="cursor-pointer text-red-600 font-semibold">
                        Törlés
                    </span>
                </div>
            </div>
        </div>
        <div class="flex justify-center items-center w-1/5">
            <svg xmlns="http://www.w3.org/2000/svg" @click="decreaseQuantity" class="h-4 w-4 hover:cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M20 12H4" />
            </svg>
            <input type="number" v-model="item.quantity" onkeydown="return false"  class="appearance-none w-10 mx-2 text-center border rouded overflow-hidden">
            <svg xmlns="http://www.w3.org/2000/svg" @click="addToCart" class="h-4 w-4 hover:cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
            </svg>
        </div>
        <div class="w-1/5 text-center">
            {{ new Intl.NumberFormat().format(item.price) }} Ft
        </div>
        <div class="w-1/5 text-center">
            {{ new Intl.NumberFormat().format(item_total) }} Ft
        </div>
    </div>
</template>

<style scoped>
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    input[type=number] {
        -moz-appearance: textfield;
    }
</style>