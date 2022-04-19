<script>import useOrders from "../../composables/orders"


    export default {
    props: {
        order: Object
    },
    setup() {
        const { updateOrder} = useOrders()

        const acceptOrder = async (id) => {
            await updateOrder(id, {"status": "Feldolgozva"})
            //getOrders meghívása parent component-ből
        }

        const denyOrder = async (id) => {
            await updateOrder(id, {"status": "Elutasítva"})
            //getOrders meghívása parent component-ből
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
        <td class=" text-center font-semibold" :class="order.status == 'Feldolgozva' ? 'text-green-600 font-semibold' : order.status == 'Elutasítva' ? 'text-red-600 font-semibold' : 'text-black'">
            {{ order.status }}
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