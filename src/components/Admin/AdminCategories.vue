<script>
import { RouterLink } from 'vue-router';
import useCategories from "../../composables/categories";
import { onMounted } from "vue";

    export default {
        setup() {
            const {categories, getCategories, destroyCategories} = useCategories()
    
            onMounted(getCategories)

            const deleteCategory = async (id) => {
                if (!window.confirm("Bitzos törölni akarod ezt a kategóriát?")) {
                    return
                }

                await destroyCategories(id);
                await getCategories();
            }
    
            return {
                categories,
                deleteCategory
            }
        },
        components: { RouterLink }
    }
</script>

<template>
    <div class="ml-64 px-12 mt-8 w-full">
        <RouterLink to="/admin/new-category">
            <button class="rounded-lg px-4 py-2 mb-4 bg-cyan-700 text-white hover:bg-cyan-600">Új kategória hozzáadása</button>
        </RouterLink>
        <table class="w-full text-sm text-left">
            <thead class="">
                <tr>
                    <th>Név</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="category in categories" :key="category.id">
                    <td>{{ category.name }}</td>
                    <td>
                        <button class="rounded-lg px-4 py-2 bg-blue-600 text-white">Módosítás</button>
                        <button class="rounded-lg px-4 py-2 bg-red-600 text-white" @click="deleteCategory(category.id)">Törlés</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>