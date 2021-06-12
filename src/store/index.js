import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'
import moduloLocalData from './module-localdata';

export default store(function( /* { ssrContext } */ ) {
    const Store = createStore({
        modules: {
            moduloLocalData
        },

        // enable strict mode (adds overhead!)
        // for dev mode and --debug builds only
        strict: process.env.DEBUGGING
    })

    return Store
})