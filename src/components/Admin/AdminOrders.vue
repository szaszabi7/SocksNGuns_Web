<script>
import { RouterLink } from 'vue-router';
import { onMounted } from "vue";
import useOrders from '../../composables/orders';
import ProfileOrderItem from '../UserProfile/ProfileOrderItem.vue';
import AdminOrderItem from './AdminOrderItem.vue';

    export default {
        setup() {
            const { orders, getOrders } = useOrders()
    
            onMounted(getOrders)

            return {
                orders,
                getOrders
            }
        },
        components: { RouterLink, ProfileOrderItem, AdminOrderItem }
    }
</script>

<template>
    <div class="ml-64 px-12 mt-8 w-full">
        <table class="w-full">
            <thead>
                <tr>
                    <th class="text-left py-2">Rendelés száma</th>
                    <th class="text-center py-2">Rendelés státusza</th>
                    <th class="text-right py-2">Teljes összeg</th>
                    <th class="text-center py-2">Rendelés dátuma</th>
                </tr>
            </thead>
            <tbody>
                <AdminOrderItem v-for="order in orders" :key="order.id" :order="order" :getOrder="getOrders" class="even:bg-gray-100 hover:bg-gray-200" />
            </tbody>
        </table>
    </div>
</template>