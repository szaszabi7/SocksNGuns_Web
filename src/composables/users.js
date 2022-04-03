import { ref } from "vue";
import axiosClient from "../axios";

export default function useUsers() {
    const users = ref([])
    const user = ref([])
    const userCount = ref()

    const getUsers = async () => {
        let response = await axiosClient.get('/users')
        users.value = response.data
    }

    const getUser = async (id) => {
        let response = await axiosClient.get(`/users/${id}`)
        user.value = response.data
    }

    const getUserCount = async () => {
        let response = await axiosClient.get('/user/count')
        userCount.value = response.data
    }

    const destroyUser = async (id) => {
        await axiosClient.delete(`/users/${id}`)
    }

    return {
        users,
        getUsers,
        user,
        getUser,
        userCount,
        getUserCount,
        destroyUser
    }
}