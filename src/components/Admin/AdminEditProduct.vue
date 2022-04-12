<script>
import { onMounted, reactive } from "vue";
import useCategories from "../../composables/categories";
import useProducts from "../../composables/products";
import { useRoute, useRouter } from "vue-router";

    export default {
        setup() {
            const { categories, getCategories } = useCategories()
            const { product, getProduct, updateProduct  } = useProducts()
            const route = useRoute();
            const router = useRouter();

            onMounted(loadData)

            function loadData() {
                const id = route.params.id;
                getProduct(id);
                getCategories()
            }

            const saveProduct = async () => {
                await updateProduct(route.params.id, product.value)
                    .then(() => {
                        router.push({
                            name: "AdminProductsPanel",
                        })
                    });
            }

            function onImageChoose(ev) {
                const file = ev.target.files[0];

                const reader = new FileReader();
                reader.onload = () => {
                    this.product.image = reader.result;
                }
                reader.readAsDataURL(file)
            }

            return {
                categories,
                product,
                saveProduct,
                onImageChoose
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
                    <img v-if="product.image" :src="product.image" :alt="product.name" class="w-64 h-auto mb-4">
                    <input type="file" @change="onImageChoose" id="img" name="img" accept="image/*">
                </div>
                <div class="mt-2">
                    <label class="block mb-1">Termék neve</label>
                    <input type="text" name="name" v-model="product.name" class="w-full border border-black pl-1 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-700">
                </div>
                <div class="mt-2">
                    <label class="block mb-1">Kategória</label>
                    <select v-model="product.category_id" name="cetegory_id" placeholder="Válassz egyet!" class="w-full border border-black pl-1 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-700">
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
                <button @click="saveProduct" class="rounded-lg px-4 py-2 mt-4 bg-cyan-700 text-white hover:bg-cyan-600">Termék módosítása</button>
            </div>
        </div>
    </div>
</template>