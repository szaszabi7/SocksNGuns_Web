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
    <div v-for="product in products" :key="product.id" class="rounded-lg overflow-hidden shadow-md border border-black max-w-xs  flex flex-col">
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
            <h3 v-if="product.category != null">{{ product.category.name }}</h3>
            <h3 v-else>Nincs kategória</h3>
            <p class="text-sm text-green-500" v-if="product.availability === 1">Raktáron</p>
            <p class="text-sm text-red-500" v-else>Nincs Raktáron</p>
        </div>
        <div class="px-4 pb-4">
            <p class="mb-1 text-base">{{ new Intl.NumberFormat().format(product.price) }} Ft</p>
            <button @click="addToCart(product.id)" class="px-6 py-2 mt-4 mr-28 w-full text-white bg-pink-600 rounded-lg hover:bg-pink-900">Kosárhoz adás</button>
        </div>
    </div>
</template>