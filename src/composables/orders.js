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
        order.value = response.data.data
    }

    const getUserOrders = async (id) => {
        let response = await axiosClient.get('/user/orders')
        useOrders.value = response.data.data
    }

    const getOrderCount = async () => {
        let response = await axiosClient.get('/order/count')
        orderCount.value = response.data
    }

    const newOrder = async (data) => {
        await axiosClient.post('/orders', data)
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
        newOrder,
        updateOrder,
        destroyOrder
    }
}