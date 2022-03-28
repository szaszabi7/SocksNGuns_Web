<script setup>
import Navbar from '../components/Navbar.vue';
import ProductCard from '@/components/ProductCard.vue'
</script>

<template>
	<Navbar />
	<div class="container mx-auto">
        <div class="grid grid-cols-5 mt-20">
            <div class="col-span-1 ml-5">
				<!-- side menu component -->
            </div>
            <div class="col-span-4">
                <div class="grid gap-4 justify-center lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
                    <ProductCard />
                </div>
            </div>
        </div>
    </div>
</template>
