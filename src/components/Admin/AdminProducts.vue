<script>
import { RouterLink } from 'vue-router';
import useProducts from "../../composables/products";
import { onMounted } from "vue";

    export default {
        setup() {
            const {products, getProducts, destroyProduct} = useProducts()
    
            onMounted(getProducts)

            const deleteProduct = async (id) => {
                if (!window.confirm("Bitzos törölni akarod ezt a terméket?")) {
                    return
                }

                await destroyProduct(id);
                await getProducts();
            }
    
            return {
                products,
                deleteProduct
            }
        },
        components: { RouterLink }
    }
</script>

<template>
    <div class="ml-64 px-12 mt-8 w-full">
        <RouterLink to="/admin/new-product">
            <button class="rounded-lg px-4 py-2 mb-4 bg-cyan-700 text-white hover:bg-cyan-600">Új termék hozzáadása</button>
        </RouterLink>
        <table class="w-full text-sm text-left">
            <thead class="">
                <tr>
                    <th>Kép</th>
                    <th>Név</th>
                    <th>Kategória</th>
                    <th>Ár</th>
                    <th>Darab</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in products" :key="product.id">
                    <td class="max-w-32">
                        <img v-if="product.image" :src="product.image">
                        <img v-else :src="'/no_image_big.png'" class="rounded-lg object-cover w-64">
                    </td>
                    <td>{{ product.name }}</td>
                    <td>{{ product.category.name }}</td>
                    <td>{{ product.price }}</td>
                    <td>{{ product.quantity }}</td>
                    <td>
                        <RouterLink :to="{ name: 'AdminEditProductPanel', params: { id: product.id }}">
                            <button class="rounded-lg px-4 py-2 bg-blue-600 text-white">Módosítás</button>
                        </RouterLink>
                        <button class="rounded-lg px-4 py-2 bg-red-600 text-white" @click="deleteProduct(product.id)">Törlés</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>