<script>
import useProducts from "../composables/products";
import { onMounted } from "vue"
import { useRoute } from "vue-router";
import Navbar from "../components/Navbar.vue";

    export default {
    setup() {
        const { product, getProduct } = useProducts();
        const route = useRoute();
        onMounted(() => {
            const id = route.params.id;
            getProduct(id);
        });
        return {
            product
        };
    },
    components: { Navbar }
}
</script>

<template>
    <Navbar />
</template>