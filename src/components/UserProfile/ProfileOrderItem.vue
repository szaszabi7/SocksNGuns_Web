<script>

    export default {
    props: {
        order: Object
    },
    setup() {
    }
}
</script>

<template>
    <div class="flex flex-col">
        <div class="flex gap-2 items-center">
            <div class="w-1/4 pl-4">
                {{ order.id }}
            </div>
            <div class="w-1/4 text-center font-semibold" :class="order.status == 'Feldolgozva' ? 'text-green-600 font-semibold' : order.status == 'Elutasítva' ? 'text-red-600 font-semibold' : 'text-black'">
                {{ order.status }}
            </div>
            <div class="w-1/4 text-right pr-4">
                {{ new Intl.NumberFormat().format(order.total_price) }} Ft
            </div>
            <div class="w-1/4 text-center">
                {{ order.created_at.split("T")[0] }}
            </div>
        </div>
    </div>
</template>