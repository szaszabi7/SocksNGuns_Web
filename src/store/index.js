import { createStore } from "vuex";
import axiosClient from "../axios";

function updateLocalStorage(cart) {
    localStorage.setItem('cart', JSON.stringify(cart))
}

const store = createStore({
    state: {
        user: {
            data: {
                is_admin: sessionStorage.getItem('admin')
            },
            token: sessionStorage.getItem('token'),
        },
        cart: []
    },
    getters: {
        user: (state) => {
            return state.user.data
        },
        productQuantity: (state) => (product) => {
            const item = state.cart.find(i => i.id === product.id)
      
            if (item) {
                return item.quantity
            }
        },
        cartItems: (state) => {
            return state.cart
        },
        cartItemCount: (state) => {
            let count = 0;
            state.cart.forEach(element => count += element.quantity)
            return count
        },
        cartTotal: (state) => {
            let total = 0;
            state.cart.forEach(element => total += (element.quantity * element.price))
            return total
        },
        cartOrder: (state) => (order_id) => {
            const cartt = [];
            state.cart.forEach(element => cartt.push({"item_id": element.id, "quantity": element.quantity, "order_id": order_id}))
            return cartt;
        }
    },
    actions: {
        getUser({ commit }) {
            return axiosClient.get('/user')
                .then(({data}) => {
                    commit('setUserOnly', data)
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
        },

        addToCart: (state, product) => {
            let item = state.cart.find( i => i.id === product.id)
      
            if (item) {
                item.quantity++
            } else {
                state.cart.push({...product, quantity: 1})
            }
      
            updateLocalStorage(state.cart)
        },
        decreaseQuantity: (state, product) => {
            let item = state.cart.find( i => i.id === product.id)
      
            if (item) {
                if (item.quantity > 1) {
                    item.quantity--
                } else {
                    state.cart = state.cart.filter(i => i.id !== product.id)
                }
            }
      
            updateLocalStorage(state.cart)
        },
        removeFromCart: (state, product) => {
            state.cart = state.cart.filter(i => i.id !== product.id)
            
            updateLocalStorage(state.cart)
        },
        updateCartFromLocalStorage: (state) => {
            const cart = localStorage.getItem('cart')
            if (cart) {
              state.cart = JSON.parse(cart)
            }
        },
        emptyCart: (state) => {
            state.cart = [];
            localStorage.removeItem('cart');
        }
    },
    modules: {},
})

export default store;