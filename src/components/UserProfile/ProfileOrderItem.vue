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
            <div class="w-1/4 text-center" :class="order.status == 'Feldolgozva' ? 'text-green-600 font-semibold' : order.status == 'Elutasítva' ? 'text-red-600 font-semibold' : 'text-black'">
                <span :class="order.status == 'Feldolgozva' ? 'px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm' : 
                                order.status == 'Elutasítva' ? 'px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-sm' : 
                                'px-2 py-1 font-semibold leading-tight text-gray-700 bg-gray-100 rounded-sm'">
                    {{ order.status }}
                </span>
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