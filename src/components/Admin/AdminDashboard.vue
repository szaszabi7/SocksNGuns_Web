<script>
import useProducts from "../../composables/products";
import useUsers from "../../composables/users";
import useOrders from "../../composables/orders";
import { onMounted } from "vue";

    export default {
        setup() {
            const { productCount, getProductCount } = useProducts();
            const { userCount, getUserCount } = useUsers();
            const { orderCount, getOrderCount, newOrderCount, getNewOrderCount } = useOrders();
    
            function loadCount() {
                getProductCount()
                getUserCount()
                getOrderCount()
                getNewOrderCount()
            }

            onMounted(loadCount);
    
            return {
                productCount,
                userCount,
                orderCount,
                newOrderCount
            }
        }
    }
</script>

<template>
    <div class="ml-64 px-12 mt-8 w-full">
        <div class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 md:gap-16 gap-4">
            <div class="flex justify-between items-center px-10 py-10 bg-slate-50 rounded shadow-lg transition-all hover:scale-105">
                <div>
                    <div class="text-3xl text-bold text-cyan-600 mb-1">{{ productCount }}</div>
                    <div class="text-lg">Termékek</div>
                </div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                </div>
            </div>
            <div class="flex justify-between items-center px-10 py-10 bg-slate-50 rounded shadow-lg transition-all hover:scale-105">
                <div>
                    <div class="text-3xl text-bold text-cyan-600 mb-1">{{ userCount }}</div>
                    <div class="text-lg">Vásárlók</div>
                </div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                </div>
            </div>
            <div class="flex justify-between items-center px-10 py-10 bg-slate-50 rounded shadow-lg transition-all hover:scale-105">
                <div>
                    <div class="text-3xl text-bold text-cyan-600 mb-1">{{ orderCount }}</div>
                    <div class="text-lg">Rendelések</div>
                </div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                </div>
            </div>
            <div class="flex justify-between items-center px-10 py-10 bg-slate-50 rounded shadow-lg transition-all hover:scale-105">
                <div>
                    <div class="text-3xl text-bold text-cyan-600 mb-1">{{ newOrderCount }}</div>
                    <div class="text-lg">Új rendelések</div>
                </div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>