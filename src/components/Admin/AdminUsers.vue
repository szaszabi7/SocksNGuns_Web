<script>
import { RouterLink } from 'vue-router';
import useUsers from "../../composables/users";
import { onMounted } from "vue";
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex';

    export default {
        setup() {
            const {users, getUsers, destroyUser} = useUsers();

            const store = useStore();
    
            onMounted(getUsers)

            const deleteUser = async (id) => {
                if (!window.confirm("Bitzos törölni akarod ezt a felhasználót?")) {
                    return
                }

                await destroyUser(id);
                await getUsers();
            }

            const currentUser = computed(() => store.getters.user)
    
            return {
                users,
                deleteUser,
                currentUser
            }
        },
        components: { RouterLink }
    }
</script>

<template>
    <div class="ml-64 px-12 mt-8 w-full">
        <table class="w-full text-sm text-left">
            <thead class="">
                <tr>
                    <th>Név</th>
                    <th>Email</th>
                    <th>Szerepkör</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id" :class="currentUser.id == user.id ? 'font-bold' : 'font-normal'">
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td v-if="user.is_admin == 0">Felhasználó</td>
                    <td v-else>Admin</td>
                    <td>
                        <button v-if="currentUser.id == user.id" class="rounded-lg px-4 py-2 bg-blue-800 cursor-not-allowed text-white">Módosítás</button>
                        <button v-else class="rounded-lg px-4 py-2 bg-blue-600 hover:bg-blue-800 text-white">Módosítás</button>
                        <button v-if="currentUser.id == user.id" class="rounded-lg px-4 py-2 bg-red-800 cursor-not-allowed text-white">Törlés</button>
                        <button v-else class="rounded-lg px-4 py-2 bg-red-600 hover:bg-red-800 text-white" @click="deleteUser(user.id)">Törlés</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>