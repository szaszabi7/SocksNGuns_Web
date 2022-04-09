import { ref } from "vue";
import axiosClient from "../axios";

export default function useProducts() {
    const products = ref([])
    const product = ref([])
    const productCount = ref()

    const getProducts = async () => {
        let response = await axiosClient.get('/items')
        products.value = response.data
    }

    const getProduct = async (id) => {
        let response = await axiosClient.get(`/items/${id}`)
        product.value = response.data
    }

    const searchProduct = async (searchName) => {
        let response = await axiosClient.get(`/items/search/${searchName}`)
        products.value = response.data
    }

    const getProductCount = async (id) => {
        let response = await axiosClient.get('/item/count')
        productCount.value = response.data
    }

    const newProduct = async (data) => {
        await axiosClient.post('/items', data)
    }

    const updateProduct = async (id, productData) => {
        await axiosClient.put(`/items/${id}`, productData)
    }

    const destroyProduct = async (id) => {
        await axiosClient.delete(`/items/${id}`)
    }

    return {
        products,
        getProducts,
        product,
        getProduct,
        productCount,
        searchProduct,
        getProductCount,
        newProduct,
        updateProduct,
        destroyProduct
    }
}