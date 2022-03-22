<script>
import useProducts from "../composables/products";
import { onMounted } from "vue"
import { useRoute } from "vue-router";
import Navbar from "../components/Navbar.vue";

    export default {
        setup() {
            const { product, getProduct } = useProducts();
            const route = useRoute();
            onMounted(() => {
                const id = route.params.id;
                getProduct(id);
            });
            return {
                product
            };
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
                <img src="https://picsum.photos/700/500?random" class="rounded-lg">
            </div>
            <div class="md:px-10 md:pt-4 relative min-h-fit">
                <h1 class="text-3xl mb-5">{{ product.name }}</h1>
                <span class="font-bold text-lg">{{ product.price }} Ft</span>
                <!-- size dropdown menu -->
                <div class="flex md:absolute md:inset-x-0 md:bottom-0 md:mx-10">
                    <div class="flex justify-center items-center">
                        <button>-</button>
                        <span>1</span>
                        <button>+</button>
                    </div>
                    <div class="grow ml-4">
                        <button class="inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium w-full text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:ring-cyan-200 dark:focus:ring-cyan-800">
                            <span class="px-5 py-2.5 w-full transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                Kosárba
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>