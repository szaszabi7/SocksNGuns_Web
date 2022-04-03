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
    <div class="ml-72 mt-8 w-full">
        <table>
            <thead class="text-center">
                <tr>
                    <td>Kép</td>
                    <td>Név</td>
                    <td>Kategória</td>
                    <td>Ár</td>
                    <td>Darab</td>
                    <td></td>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in products" :key="product.id">
                    <td><img src="https://picsum.photos/200/100"></td>
                    <td>{{ product.name }}</td>
                    <td>{{ product.category.name }}</td>
                    <td>{{ product.price }}</td>
                    <td>{{ product.quantity }}</td>
                    <td>
                        <button class="rounded-lg px-4 py-2 bg-blue-600">Módosítás</button>
                    </td>
                    <td>
                        <button class="rounded-lg px-4 py-2 bg-red-600" @click="deleteProduct(product.id)">Törlés</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>