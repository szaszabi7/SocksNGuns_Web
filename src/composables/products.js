import { ref } from "vue";

export default function useProducts() {
    const products = ref([])

    const getProducts = async () => {
        let Response = await fetch('http://127.0.0.1:8000/api/items')
        let data = await Response.json()
        products.value = data
    }

    return {
        products,
        getProducts
    }
}