<script>
import { onMounted, reactive } from "vue";
import useCategories from "../../composables/categories";
import useProducts from "../../composables/products";
import { useRouter } from "vue-router";
    export default {
        setup() {
            const { categories, getCategories } = useCategories()
            const { newProduct } = useProducts()
            const router = useRouter()

            onMounted(getCategories)

            const product = reactive({
                'name': '',
                'image': null,
                'image_url': null,
                'category_id': '',
                'price': '',
                'quantity': '',
                'availability': ''
            })

            const saveProduct = async () => {
                await newProduct({...product})
                    .then(() => {
                        router.push({
                            name: "AdminProductsPanel",
                        })
                    });
            }

            function deleteImage() {
                this.product.image = null;
                this.product.image_url = null;
            }
            
            function onImageChoose(ev) {
                const file = ev.target.files[0];

                const reader = new FileReader();
                reader.onload = () => {
                    product.image = reader.result;
                    product.image_url = reader.result;
                }
                reader.readAsDataURL(file)
            }

            return {
                categories,
                product,
                saveProduct,
                onImageChoose,
                deleteImage
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
                    <img v-if="product.image_url" :src="product.image_url" :alt="product.name" class="w-64 h-auto mb-4">
                    <div class="flex items-center">
                        <input type="file" @change="onImageChoose" id="img" name="img" accept="image/*" class="block w-full text-sm text-cyan-700 file:mr-2 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-cyan-700 file:text-white hover:file:bg-cyan-600">
                        <svg xmlns="http://www.w3.org/2000/svg" v-if="product.image != null" @click="deleteImage" class="h-7 w-7 text-red-600 ml-1 rounded-full transition-all cursor-pointer hover:rotate-90 hover:bg-[rgba(0,0,0,0.2)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
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
                <button @click="saveProduct" class="rounded-lg px-4 py-2 mt-4 bg-cyan-700 text-white hover:bg-cyan-600">Új termék hozzáadása</button>
            </div>
        </div>
    </div>
</template>