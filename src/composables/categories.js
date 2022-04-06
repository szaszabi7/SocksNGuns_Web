import { ref } from "vue";
import axiosClient from "../axios";

export default function useCategories() {
    const categories = ref([])

    const getCategories = async () => {
        let response = await axiosClient.get('/categories')
        categories.value = response.data
    }

    const destroyCategories = async (id) => {
        await axiosClient.delete(`/categories/${id}`)
    }

    return {
        categories,
        getCategories,
        destroyCategories
    }
}