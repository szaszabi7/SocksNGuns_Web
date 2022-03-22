import { ref } from "vue";
import axios from "axios";

export default function useProducts() {
    const products = ref([])
    const product = ref([])

    const getProducts = async () => {
        let response = await axios.get('http://127.0.0.1:8000/api/items')
        products.value = response.data
    }

    const getProduct = async (id) => {
        let response = await axios.get(`http://127.0.0.1:8000/api/items/${id}`)
        product.value = response.data
    }

    return {
        products,
        getProducts,
        product,
        getProduct
    }
}