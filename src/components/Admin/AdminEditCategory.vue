<script>
import useCategories from "../../composables/categories";
import { useRoute, useRouter } from "vue-router";
import { onMounted } from "vue";

    export default {
        setup() {
            const { category, updateCategory, getCategory } = useCategories()
            const route = useRoute();
            const router = useRouter();

            onMounted(() => {
                const id = route.params.id;
                getCategory(id)
            })

            const saveCategory = async () => {
                await updateCategory(route.params.id, category.value)
                    .then(() => {
                        router.push({
                            name: "AdminCategoriesPanel",
                        })
                    });
            }

            return {
                category,
                saveCategory
            }
        }
    }
</script>

<template>
    <div class="ml-64 px-12 mt-8 w-full">
        <div class="px-8 py-6 mt-4 text-left">
            <div class="mt-4 w-fit">
                <div class="mt-2">
                    <label class="block mb-1">Kategória neve</label>
                    <input type="text" name="name" v-model="category.name" class="w-full border border-black pl-1 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-700">
                </div>
                <button @click="saveCategory" class="rounded-lg px-4 py-2 mt-4 bg-cyan-700 text-white hover:bg-cyan-600">Kategória módosítása</button>
            </div>
        </div>
    </div>
</template>