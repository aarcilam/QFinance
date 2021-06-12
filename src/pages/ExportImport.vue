<template>
    <q-page padding>
        <ConfigFormComponent/>
        <q-separator />
        <h4 class="text-center text-h6">Export data</h4>
        <q-input
            type="textarea"
            v-model="localData"
            counter
            v-on:change="saveChanges"
        />
    </q-page>
</template>

<script>
import { defineComponent,ref,onMounted,computed } from 'vue';
import { useQuasar } from 'quasar';
import ConfigFormComponent from '../components/ConfigForm.vue'

export default defineComponent({
    name:'ExportImport',
    components: {ConfigFormComponent},
    setup(){
        const $q = useQuasar();
        const localData = ref('');

        onMounted(() => {
        
            let alldata = $q.localStorage.getItem('alldata');
            if(alldata){
                let data = JSON.parse(alldata);
                localData.value = alldata;
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