<template>
    <q-page padding>
        <q-btn color="primary" label="Back" to="/"/>
        
    </q-page>
</template>

<script>
import { defineComponent,ref,onMounted,computed } from 'vue';
import { useQuasar } from 'quasar';

export default defineComponent({
    name:'ExportImport',
    setup(){
        const $q = useQuasar();
        const ingresos = ref([]);
        const gastos = ref([]);
        const config = ref({
            firstAmount: null
        });

        onMounted(() => {
        
            let ing = $q.localStorage.getItem('ingresos');
            if(ing){
                ingresos.value = JSON.parse(ing);
            }

            let gas = $q.localStorage.getItem('gastos');
            if(gas){
                gastos.value = JSON.parse(gas);
            }

            let config_local = $q.localStorage.getItem('config');
            if(config_local){
                config.value = JSON.parse(config_local);
            }
        
        })

        return{
            
        }
    }
})
</script>

<style>

</style>