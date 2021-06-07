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
            >
            <div>
                {{entrada.amount}}
            </div>
            </q-timeline-entry>

        </q-timeline>
    </q-page>
</template>

<script>
import { defineComponent,ref,onMounted,computed } from 'vue';
import { useQuasar } from 'quasar';

export default defineComponent({
    name:'PageTimeline',
    setup(){
        const $q = useQuasar();
        const ingresos = ref([]);
        const gastos = ref([]);

        

        onMounted(() => {
        
            let ing = $q.localStorage.getItem('ingresos');
            if(ing){
                ingresos.value = JSON.parse(ing);
            }

            let gas = $q.localStorage.getItem('gastos');
            if(gas){
                gastos.value = JSON.parse(gas);
            }
        
        })

        const entradas = computed(()=>{
            let mixed = {...ingresos.value, ...gastos.value };

            return mixed;
        })

        return{
            entradas
        }
    }
})
</script>

<style>

</style>