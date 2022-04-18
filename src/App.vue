<script>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import store from './store'

    export default {
        setup() {
            onMounted(() => {store.commit('updateCartFromLocalStorage')})
        },
        components: { RouterView }
    }
</script>

<template>
  <RouterView />
</template>

<style>

</style>
