<template>
    <q-page padding>
        <q-btn color="primary" label="Back" to="/"/>
        <q-timeline color="secondary" class="q-pa-lg">
            <q-timeline-entry heading>
                Linea de tiempo movimientos
            </q-timeline-entry>

            <q-timeline-entry
            v-for="entrada in entradas"
            :key="entrada.id"
            :title="entrada.title"
            :subtitle="entrada.date"
            :color="entrada.type == 'ingreso' ? 'green' : 'red' "
            :icon="entrada.type == 'ingreso' ? 'savings' : 'price_check' "
            >
            <div>
                {{moneyFormat(entrada.amount)}}
            </div>
            </q-timeline-entry>

        </q-timeline>
    </q-page>
</template>

<script>
import { defineComponent,ref,onMounted,computed } from 'vue';
import { useQuasar } from 'quasar';
import { useStore } from 'vuex';
import {moneyFormat} from '../helper';

export default defineComponent({
    name:'PageTimeline',
    setup(){
        const $q = useQuasar();
        const store = useStore();
        store.dispatch('getLocal');   
        const ingresos = store.getters.getIngresos;
        const gastos = store.getters.getGastos;

        

        onMounted(() => {
        
        })

        const entradas = computed(()=>{
            let mixed = [...ingresos, ...gastos ];
            let sort = mixed.sort(function(a, b) {
                let dateA = new Date(a.date);
                let dateB = new Date(b.date);
                return dateB - dateA
            });
            return sort;
        })

        return{
            entradas,
            moneyFormat
        }
    }
})
</script>

<style>

</style>