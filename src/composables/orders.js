import { ref } from "vue";
import axiosClient from "../axios";

export default function useOrders() {
    const orders = ref([])
    const order = ref([])
    const userOrders = ref([])
    const orderCount = ref()

    const getOrders = async () => {
        let response = await axiosClient.get('/orders')
        orders.value = response.data
    }
    
    const getOrder = async (id) => {
        let response = await axiosClient.get(`orders/${id}`)
        order.value = response.data
    }

    const getUserOrders = async () => {
        let response = await axiosClient.get('/user/orders')
        userOrders.value = response.data
    }

    const getOrderCount = async () => {
        let response = await axiosClient.get('/order/count')
        orderCount.value = response.data
    }

    const updateOrder = async (id, orderData) => {
        await axiosClient.put(`/orders/${id}`, orderData)
    }

    const destroyOrder = async (id) => {
        await axiosClient.delete(`/orders/${id}`)
    }

    return {
        orders,
        getOrders,
        order,
        getOrder,
        userOrders,
        getUserOrders,
        orderCount,
        getOrderCount,
        updateOrder,
        destroyOrder
    }
}