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
        <div class="pb-6 px-2 md:px-10">
            <div class="flex flex-col">
                <div class="flex gap-2 items-center mb-2 sticky top-0 py-4 bg-white">
                    <div class="w-1/5 md:w-1/4 text-sm md:text-lg font-semibold">Rendelés száma</div>
                    <div class="w-2/4 md:w-1/4 text-center text-sm md:text-lg font-semibold">Rendelés státusza</div>
                    <div class="w-1/4 md:w-1/4 text-right md:pr-4 text-sm md:text-lg font-semibold">Teljes összeg</div>
                    <div class="w-1/4 md:w-1/4 text-center text-sm md:text-lg font-semibold">Rendelés dátuma</div>
                </div>
                <ProfileOrderItem v-for="order in userOrders" :key="order.id" :order="order" class="py-2 text-xs md:text-base hover:bg-gray-100"/>
            </div>
        </div>
    </div>
</template>