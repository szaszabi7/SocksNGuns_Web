<script>
import { onMounted } from "vue"
import useOrders from "../../composables/orders"
import ProfileOrderItem from "./ProfileOrderItem.vue"


    export default {
    setup() {
        const { userOrders, getUserOrders } = useOrders();
        onMounted(getUserOrders);
        return {
            userOrders
        };
    },
    components: { ProfileOrderItem }
}
</script>

<template>
    <div class="w-full bg-white rounded-r-2xl">
        <div class="py-6 px-10">
            <div class="flex flex-col">
                <div class="flex gap-2 items-center mb-2">
                    <div class="w-1/4 text-lg font-semibold">Rendelés száma</div>
                    <div class="w-1/4 text-center text-lg font-semibold">Rendelés státusza</div>
                    <div class="w-1/4 text-right pr-4 text-lg font-semibold">Teljes összeg</div>
                    <div class="w-1/4 text-center text-lg font-semibold">Rendelés dátuma</div>
                </div>
                <ProfileOrderItem v-for="order in userOrders" :key="order.id" :order="order" class="py-2 even:bg-gray-100 hover:bg-gray-200"/>
            </div>
        </div>
    </div>
</template>