import { LocalStorage } from 'quasar'
import { Notify } from 'quasar'
import { filterArrayRanges } from '../helper';

export default {
    state: () => ({
        ingresos: [],
        gastos: [],
        pendientes: [],
        deudas: [],
        config: {
            firstAmount: 0,
            userName: 'User',
            datesRange: null
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
        getRangeIngresos(state) {
            if (state.config.datesRange != null) {
                let from = new Date(state.config.datesRange.from);
                let to = new Date(state.config.datesRange.to);
                return filterArrayRanges(state.ingresos, from, to);
            }
            return state.ingresos;
        },
        getGastos(state) {
            return state.gastos;
        },
        getRangeGastos(state) {
            if (state.config.datesRange != null) {
                let from = new Date(state.config.datesRange.from);
                let to = new Date(state.config.datesRange.to);
                return filterArrayRanges(state.gastos, from, to);
            }
            return state.gastos;
        },
        getPendientes(state) {
            return state.pendientes;
        },
        getRangePendientes(state) {
            if (state.config.datesRange != null) {
                let from = new Date(state.config.datesRange.from);
                let to = new Date(state.config.datesRange.to);
                return filterArrayRanges(state.pendientes, from, to);
            }
            return state.pendientes;
        },
        getDeudas(state) {
            return state.deudas;
        },
        getRangeDeudas(state) {
            if (state.config.datesRange != null) {
                let from = new Date(state.config.datesRange.from);
                let to = new Date(state.config.datesRange.to);
                return filterArrayRanges(state.deudas, from, to);
            }
            return state.deudas;
        },
        getConfig(state) {
            return state.config;
        }
    }
}