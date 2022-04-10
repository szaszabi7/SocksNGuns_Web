import { createStore } from "vuex";
import axiosClient from "../axios";

const store = createStore({
    state: {
        user: {
            data: {
                is_admin: sessionStorage.getItem('admin')
            },
            token: sessionStorage.getItem('token'),
        }
    },
    getters: {
        user: (state) => {
            return state.user.data
        }
    },
    actions: {
        getUser({ commit }) {
            return axiosClient.get('/user')
                .then(({data}) => {
                    commit('setUserOnly', data)
                    //return data;
                })
        },
        register({ commit }, user) {
            return axiosClient.post('/register', user)
                .then(({data}) => {
                    commit('setUser', data);
                    return data;
                })
        },
        login({ commit }, user) {
            return axiosClient.post('/login', user)
                .then(({data}) => {
                    commit('setUser', data);
                    return data;
                })
        },
        logout({commit}) {
            return axiosClient.post('/logout')
                .then(response => {
                    commit('logout')
                    return response;
                })
        }
    },
    mutations: {
        logout: (state) => {
            state.user.token = null;
            state.user.data = {};
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('admin');
        },
        setUser: (state, userData) => {
            state.user.token = userData.token;
            sessionStorage.setItem('token', userData.token);
            state.user.data = userData.user;
            sessionStorage.setItem('admin', userData.user.is_admin);
        },
        setUserOnly: (state, userData) => {
            state.user.data = userData;
        }
    },
    modules: {},
})

export default store;