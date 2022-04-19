<script>
import useOrders from "../../composables/orders"


    export default {
    props: {
        order: Object,
        getOrder: Function
    },
    setup(props) {
        const { updateOrder } = useOrders()

        const acceptOrder = async (id) => {
            await updateOrder(id, {"status": "Feldolgozva"}).then(props.getOrder())
        }

        const denyOrder = async (id) => {
            await updateOrder(id, {"status": "Elutasítva"}).then(props.getOrder())
        }

        return {
            acceptOrder,
            denyOrder
        }
    }
}
</script>

<template>
    <tr class="py-6">
        <td class=" pl-4">
            {{ order.id }}
        </td>
        <td class="text-center">
            <span :class="order.status == 'Feldolgozva' ? 'px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm' : 
                            order.status == 'Elutasítva' ? 'px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-sm' : 
                            'px-2 py-1 font-semibold leading-tight text-gray-700 bg-gray-100 rounded-sm'">
                {{ order.status }}
            </span>
        </td>
        <td class=" text-right pr-4">
            {{ new Intl.NumberFormat().format(order.total_price) }} Ft
        </td>
        <td class=" text-center">
            {{ order.created_at.split("T")[0] }}
        </td>
        <td class="flex">
            
            <button v-if="order.status != 'Feldolgozásra vár'" class="rounded-lg px-4 py-2 bg-green-900 cursor-not-allowed text-white mr-2">Elfogadás</button>
            <button v-else @click="acceptOrder(order.id)" class="rounded-lg px-4 py-2 bg-green-600 text-white mr-2">Elfogadás</button>
            <button v-if="order.status != 'Feldolgozásra vár'" class="rounded-lg px-4 py-2 bg-red-900 cursor-not-allowed text-white">Elutasítás</button>
            <button v-else @click="denyOrder(order.id)" class="rounded-lg px-4 py-2 bg-red-600 text-white">Elutasítás</button>
        </td>
    </tr>
</template>