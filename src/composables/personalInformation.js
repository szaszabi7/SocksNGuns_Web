import { ref } from "vue";
import axiosClient from "../axios";

export default function usePersonalInformations() {
    const pInfo = ref()
    let success = ref('')
    let error = ref([])
    let hasData = ref(false)
    let errorMessage = ref('')

    const getPersonalInformation = async () => {
        let response = await axiosClient.get("/personal_information")
        
        pInfo.value = response.data
        if (pInfo.value[0] != null) {
            hasData.value = true
        }
    }

    const newPersonalInformation = async (data) => {
        await axiosClient.post('/personal_information', data)
        .then((response) => {
            if (response.status == 201) {
                success.value = response.data.message
            }
        })
    }

    const updatePersonalInformation = async (id, personalInformationData) => {
        await axiosClient.put(`/personal_information/${id}`, personalInformationData)
        .then((response) => {
            if (response.status == 200) {
                success.value = response.data.message
            }
        })
    }

    const destroyPersonalInformation = async (id) => {
        await axiosClient.delete(`/personal_information/${id}`)
        .then((response) => {
            if (response.status == 200) {
                success.value = response.data.message
                hasData.value = false
            }
        })
    }

    return {
        success,
        error,
        hasData,
        errorMessage,
        getPersonalInformation,
        newPersonalInformation,
        updatePersonalInformation,
        destroyPersonalInformation,
        pInfo,
    }
}