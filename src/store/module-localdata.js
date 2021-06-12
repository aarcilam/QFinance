import { LocalStorage } from 'quasar'
import { Notify } from 'quasar'

export default {
    state: () => ({
        ingresos: [],
        gastos: [],
        pendientes: [],
        deudas: [],
        config: {
            firstAmount: 0,
            userName: 'User'
        }
    }),
    mutations: {
        addValue(state, payload) {
            switch (payload.type) {
                case 'ingresos':
                    state.ingresos.push(payload.value);
                    break;
                case 'gastos':
                    state.gastos.push(payload.value);
                    break;
                case 'pendientes':
                    state.pendientes.push(payload.value);
                    break;
                case 'deudas':
                    state.deudas.push(payload.value);
                    break;
            }
        },
        deleteValue(state, payload) {
            switch (payload.type) {
                case 'ingresos':
                    state.ingresos.splice(payload.key, 1);
                    break;
                case 'gastos':
                    state.gastos.splice(payload.key, 1);
                    break;
                case 'pendientes':
                    state.pendientes.splice(payload.key, 1);
                    break;
                case 'deudas':
                    state.deudas.splice(payload.key, 1);
                    break;
            }
        },
        getLocal(state) {
            let alldata = LocalStorage.getItem('alldata');
            if (alldata) {
                let data = JSON.parse(alldata);
                state.gastos = data.gastos || state.gastos;
                state.ingresos = data.ingresos || state.ingresos;
                state.config = data.config || state.config;
                state.pendientes = data.pendientes || state.pendientes;
                state.deudas = data.deudas || state.deudas;
            }
        },
        saveLocal(state) {
            LocalStorage.set('alldata', JSON.stringify({
                config: state.config,
                ingresos: state.ingresos,
                gastos: state.gastos,
                pendientes: state.pendientes,
                deudas: state.deudas
            }));
            Notify.create({
                type: 'positive',
                message: 'Datos guardados con exito'
            });
            console.log("guardo en stage");
        },
        addConfig(state, payload) {
            state.config = payload;
        }
    },
    actions: {
        addValue({ commit }, payload) {
            commit('addValue', payload);
            commit('saveLocal');
        },
        deleteValue({ commit }, payload) {
            commit('deleteValue', payload);
            commit('saveLocal');
        },
        getLocal({ commit }) {
            commit('getLocal');
        },
        saveLocal({ commit }) {
            commit('saveLocal');
        },
        addConfig({ commit }, payload) {
            commit('addConfig', payload);
            commit('saveLocal');
        }
    },
    getters: {
        getIngresos(state) {
            return state.ingresos;
        },
        getGastos(state) {
            return state.gastos;
        },
        getPendientes(state) {
            return state.pendientes;
        },
        getDeudas(state) {
            return state.deudas;
        },
        getConfig(state) {
            return state.config;
        }
    }
}