import { ref } from "vue";
import axiosClient from "../axios";

export default function useCategories() {
    const categories = ref([])
    const category = ref([])

    const getCategories = async () => {
        let response = await axiosClient.get('/categories')
        categories.value = response.data
    }

    const getCategory = async (id) => {
        let response = await axiosClient.get(`/categories/${id}`)
        category.value = response.data
    }

    const destroyCategories = async (id) => {
        await axiosClient.delete(`/categories/${id}`)
    }

    const newCategory = async (data) => {
        await axiosClient.post('/categories', data)
    }

    const updateCategory = async (id, categoryData) => {
        await axiosClient.put(`/categories/${id}`, categoryData)
    }

    return {
        categories,
        category,
        getCategories,
        getCategory,
        destroyCategories,
        newCategory,
        updateCategory
    }
}