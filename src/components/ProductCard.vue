<script setup>
    import { ref, onMounted } from 'vue'

    const products = ref([])

    const loadData = async () => {
        let Response = await fetch('http://127.0.0.1:8000/api/items')
        let data = await Response.json()
        products.value = data
    }

    onMounted(loadData)
      
</script>

<template>
    <div class="grid grid-cols-6">
        <div class="col-span-1 ml-5">
            <div>
                Side menu
            </div>
        </div>
        <div class="grid gap-4 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 col-span-5 pr-5">
            <div v-for="product in products" :key="product.id" class="rounded-lg overflow-hidden shadow-md border border-black max-w-xs min-w-fit">
                <img src="https://picsum.photos/300/200?random" class="w-full object-cover">
                <div class="m-4">
                    <p class="font-bold capitalize">{{ product.name }}</p>
                    <p class="text-sm text-green-500" v-if="product.availability === 1">Raktáron</p>
                    <p class="text-sm text-red-500" v-else>Nincs Raktáron</p>
                    <p class="mt-4 mb-1 text-base">{{ product.price }} Ft</p>
                    <button class="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium w-full text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:ring-cyan-200 dark:focus:ring-cyan-800">
                        <span class="relative px-5 py-2.5 w-full transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            Kosárba
                        </span>
                    </button>
                </div>
            </div>
        </div>
    </div>
    
</template>