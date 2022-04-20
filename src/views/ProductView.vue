<script>
import useProducts from "../composables/products";
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router";
import Navbar from "../components/Navbar.vue";
import store from "../store";

    export default {
        setup() {
            const { product, getProduct } = useProducts();
            const route = useRoute();
            onMounted(() => {
                const id = route.params.id;
                getProduct(id)
            })

            function addToCart() {
                store.commit('addToCart', product.value)
            }

            return {
                product,
                addToCart
            }
        },
        components: { Navbar }
    }
</script>

<template>
    <Navbar />
    <div class="container mt-24 md:mt-40 mx-auto">
        <div> <!-- product header -->
            <div><!-- breadcrumb --></div>
        </div>
        <div class="grid md:grid-cols-2 grid-cols-1 gap-4 px-14">
            <div>
                <img v-if="product.image" :src="product.image" class="rounded-lg">
                <img v-else :src="'/no_image_big.png'" class="rounded-lg">
            </div>
            <div class="md:px-10 md:pt-4  min-h-fit flex flex-col">
                <div>
                    <h1 class="text-3xl">{{ product.name }}</h1>
                    <h3 class="mb-5" v-if="product.category != null">{{ product.category.name }}</h3>
                    <h3 class="mb-5" v-else>Nincs kategória</h3>
                    <span class="font-bold text-lg">{{ new Intl.NumberFormat().format(product.price) }} Ft</span>
                </div>
                <!-- size dropdown menu -->
                <div class="grow py-4">
                    <h3 class="font-bold text-lg">Leírás</h3>
                    <p>{{ product.description }}</p>
                </div>
                <div class="flex">
                    <div class="grow mx-4">
                        <button @click="addToCart" class="px-6 py-2 mt-4 mr-28 w-full text-white bg-pink-600 rounded-lg hover:bg-pink-900">Kosárhoz adás</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>