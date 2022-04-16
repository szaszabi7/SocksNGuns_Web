<script setup>
import Navbar from '../components/Navbar.vue';
import ProductCard from '@/components/ProductCard.vue'
import Footer from '../components/Footer.vue';
</script>

<template>
    <div class="h-screen flex flex-col">
        <Navbar />
        <div class="container mx-auto px-10 pt-24 pb-10 grow">
            <div class="grid lg:grid-cols-5">
                <div class="lg:col-span-3 lg:col-start-2">
                    <div class="grid gap-5 justify-center lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2">
                        <ProductCard />
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>
