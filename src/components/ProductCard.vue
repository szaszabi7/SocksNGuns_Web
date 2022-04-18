<script>
import { RouterLink } from 'vue-router';
import useProducts from "../composables/products";
import { onMounted } from "vue";
import store from '../store';

    export default {
        setup() {
            const {products, getProducts} = useProducts()
    
            onMounted(getProducts)

            function addToCart(index) {
                store.commit('addToCart', products.value[index-1])
            }
    
            return {
                products,
                addToCart
            }
        },
        components: { RouterLink }
    }
      
</script>

<template>
    <div v-for="product in products" :key="product.id" class="rounded-lg overflow-hidden shadow-md border border-black max-w-xs min-w-fit flex flex-col">
        <div>
            <RouterLink :to="{ name: 'ProductPage', params: { id: product.id }}">
                <img v-if="product.image" :src="product.image" class="w-full object-contain">
                <img v-else :src="'/no_image_big.png'" class="w-full object-cover">
            </RouterLink>
        </div>
        <div class="p-4 grow">
            <p class="font-bold capitalize">
                <RouterLink :to="{ name: 'ProductPage', params: { id: product.id }}">
                    {{ product.name }}
                </RouterLink>
            </p>
            <p class="text-sm text-green-500" v-if="product.availability === 1">Raktáron</p>
            <p class="text-sm text-red-500" v-else>Nincs Raktáron</p>
        </div>
        <div class="px-4 pb-4">
            <p class="mb-1 text-base">{{ new Intl.NumberFormat().format(product.price) }} Ft</p>
            <button @click="addToCart(product.id)" class="inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium w-full text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:ring-cyan-200 dark:focus:ring-cyan-800">
                <span class="px-5 py-2.5 w-full transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Kosárba
                </span>
            </button>
        </div>
    </div>
</template>