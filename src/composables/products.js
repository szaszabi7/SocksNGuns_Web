import { ref } from "vue";
import axiosClient from "../axios";

export default function useProducts() {
    const products = ref([])
    const product = ref([])

    const getProducts = async () => {
        let response = await axiosClient.get('/items')
        products.value = response.data
    }

    const getProduct = async (id) => {
        let response = await axiosClient.get(`/items/${id}`)
        product.value = response.data
    }

    const destroyProduct = async (id) => {
        await axiosClient.delete(`/items/${id}`)
    }

    return {
        products,
        getProducts,
        product,
        getProduct,
        destroyProduct
    }
}