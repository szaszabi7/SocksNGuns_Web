import { ref } from "vue";
import axiosClient from "../axios";

export default function useOrderItems() {
    const orderItems = ref([])
    /* const orderItems = ref([])

    const getOrders = async () => {
        let response = await axiosClient.get('/order_items')
        orderItems.value = response.data
    } */

    const getOrderItems = async (id) => {
        let response = await axiosClient.get(`order_items/${id}`)
        orderItems.value = response.data
    }

    return {
        orderItems,
        getOrderItems
        //getOrders
    }
}