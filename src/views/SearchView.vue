<script>
import Navbar from '../components/Navbar.vue';
import SearchProductCard from '../components/SearchProductCard.vue';
import Footer from '../components/Footer.vue';
import useProducts from '../composables/products';
import { reactive, ref } from 'vue';

    export default {
        setup() {
            const { products, searchProduct } = useProducts()

            const searchValue = reactive ({
                'name': ''
            })

            const errorMessage = ref([])

            const search = async (searchName) => {
                await searchProduct(searchName)
                    .catch(err => {
                        if (err.response.status == 404) {
                            errorMessage.value = err.response.data
                            products.value = null
                        }
                    })
                    
            }

            return {
                search,
                searchValue,
                products,
                errorMessage
            }
        },
        components: { Navbar, SearchProductCard, Footer }
    }
</script>

<template>
 <div class="h-screen flex flex-col">
     <Navbar />
     <div class="container mx-auto px-10 pt-16 pb-10 grow">
        <h1 class="text-center text-4xl">Keresés</h1>
        <div class="flex justify-center w-full rounded mt-4">
            <input type="search" v-model="searchValue.name" @keyup.enter="search(searchValue.name)" class="w-full px-3 py-1.5 rounded-md border border-black text-black focus:border-pink-600 focus:outline-none" placeholder="Keresés">
        </div>
        <div class="grid md:gap-5 gap-10 justify-center xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 mt-10">
            <SearchProductCard :errorMessage="errorMessage" :products="products"/>
        </div>
     </div>
     <Footer />
 </div>
</template>
