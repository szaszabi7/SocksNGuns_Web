<script>
import { onMounted, reactive } from "vue";
import useCategories from "../../composables/categories";
import useProducts from "../../composables/products";
    export default {
        setup() {
            const { categories, getCategories } = useCategories()
            const { newProduct } = useProducts()

            onMounted(getCategories)

            const product = reactive({
                'name': '',
                'category_id': '',
                'price': '',
                'quantity': '',
                'availability': ''
            })

            function resetForm() {
                product.name = '',
                product.category_id = '',
                product.price = '',
                product.quantity = ''
            }

            const saveProduct = async () => {
                await newProduct({...product})
                resetForm()
            }

            return {
                categories,
                product,
                saveProduct
            }
        }
    }
</script>

<template>
    <div class="ml-64 px-12 mt-8 w-full">
        <div class="px-8 py-6 mt-4 text-left">
            <div class="mt-4 w-fit">
                <div>
                    <label for="img" class="block mb-1">Kép</label>
                    <input type="file" id="img" name="img" accept="image/*">
                </div>
                <div class="mt-2">
                    <label class="block mb-1">Termék neve</label>
                    <input type="text" name="name" v-model="product.name" class="w-full border border-black pl-1 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-700">
                </div>
                <div class="mt-2">
                    <label class="block mb-1">Kategória</label>
                    <select  v-model="product.category_id" name="cetegory_id" placeholder="Válassz egyet!" class="w-full border border-black pl-1 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-700">
                        <option v-for="category in categories" :value="category.id" :key="category.id">{{ category.name }}</option>
                    </select>
                </div>
                <div class="mt-2">
                    <label class="block mb-1">Ár</label>
                    <input type="number" name="price" v-model="product.price" min="1" class="w-full border border-black pl-1 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-700">
                </div>
                <div class="mt-2">
                    <label class="block mb-1">Mennyiség</label>
                    <input type="number" name="quantity" v-model="product.quantity" min="1" class="w-full border border-black pl-1 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-700">
                </div>
                <button @click="saveProduct" class="rounded-lg px-4 py-2 mt-4 bg-cyan-700 text-white hover:bg-cyan-600">Új terkék hozzáadása</button>
            </div>
        </div>
    </div>
</template>