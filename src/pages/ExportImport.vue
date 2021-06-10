<template>
    <q-page padding>
        <q-btn color="primary" label="Back" to="/"/>
        <q-input
                type="textarea"
                v-model="localData"
                autofocus
                counter
                v-on:change="saveChanges"
        />
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
        const localData = ref('');

        onMounted(() => {
        
            let alldata = $q.localStorage.getItem('alldata');
            if(alldata){
                let data = JSON.parse(alldata);
                localData.value = alldata;
                gastos.value = data.gastos;
                ingresos.value = data.ingresos;
                config.value = data.config;
            }
        
        })

        const saveChanges = ()=>{
            $q.localStorage.set('alldata', localData.value);
            console.log(localData.value);
            $q.notify('Datos guardados');
        };

        return{
            localData,
            saveChanges
        }
    }
})
</script>

<style>

</style>