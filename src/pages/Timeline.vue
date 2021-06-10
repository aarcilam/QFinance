<template>
    <q-page padding>
        <q-btn color="primary" label="Back" to="/"/>
        <q-timeline color="secondary">
            <q-timeline-entry heading>
            Timeline heading
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
import {moneyFormat} from '../helper';

export default defineComponent({
    name:'PageTimeline',
    setup(){
        const $q = useQuasar();
        const ingresos = ref([]);
        const gastos = ref([]);

        

        onMounted(() => {
        
            let alldata = $q.localStorage.getItem('alldata');
            if(alldata){
                let data = JSON.parse(alldata);
                gastos.value = data.gastos || [];
                ingresos.value = data.ingresos || [];
            }
        
        })

        const entradas = computed(()=>{
            let mixed = [...ingresos.value, ...gastos.value ];

            return mixed;
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