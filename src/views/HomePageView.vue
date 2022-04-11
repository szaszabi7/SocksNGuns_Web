<script setup>
import Navbar from '../components/Navbar.vue';
import ProductCard from '@/components/ProductCard.vue'
import Footer from '../components/Footer.vue';
</script>

<template>
	<Navbar />
	<div class="container mx-auto">
        <div class="grid lg:grid-cols-5 mt-20">
            <div class="lg:col-span-3 lg:col-start-2">
                <div class="grid gap-4 justify-center lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2">
                    <ProductCard />
                </div>
            </div>
        </div>
    </div>
    <Footer />
</template>
