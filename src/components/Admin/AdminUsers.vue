<script>
import { RouterLink } from 'vue-router';
import useUsers from "../../composables/users";
import { onMounted } from "vue";

    export default {
        setup() {
            const {users, getUsers, destroyUser} = useUsers();
    
            onMounted(getUsers)

            const deleteUser = async (id) => {
                if (!window.confirm("Bitzos törölni akarod ezt a felhasználót?")) {
                    return
                }

                await destroyUser(id);
                await getUsers();
            }
    
            return {
                users,
                deleteUser
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
                <tr v-for="user in users" :key="user.id">
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td v-if="user.is_admin == 0">Felhasználó</td>
                    <td v-else>Admin</td>
                    <td>
                        <button class="rounded-lg px-4 py-2 bg-blue-600 text-white">Módosítás</button>
                        <button class="rounded-lg px-4 py-2 bg-red-600 text-white" @click="deleteUser(user.id)">Törlés</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>