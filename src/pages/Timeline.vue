<template>
    <q-page padding>
        <q-timeline color="secondary" class="q-pa-lg">
            <q-timeline-entry heading>
                <h5 class="text-center text-h6 q-my-xl">Linea de tiempo movimientos</h5>
            </q-timeline-entry>

            <q-timeline-entry
            v-for="entrada in entradas"
            :key="entrada.id"
            :title="moneyFormat(entrada.amount)"
            :subtitle="entrada.date"
            :color="entrada.type == 'ingreso' ? 'green' : 'red' "
            :icon="entrada.type == 'ingreso' ? 'savings' : 'price_check' "
            >
            <div>
                {{entrada.title}}
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
        const ingresos = store.getters.getRangeIngresos;
        const gastos = store.getters.getRangeGastos;

        

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