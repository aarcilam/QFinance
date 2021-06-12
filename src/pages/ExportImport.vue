<template>
    <q-page padding>
        <h5 class="text-center text-h6 q-my-xl">Config</h5>
        <q-input 
            label="Dinero incial" stack-label
            placeholder="First amount" 
            outlined 
            v-model="firstAmount" 
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'El valor actual tiene que tener un valor']" 
            v-on:change="saveConfig"
        />
        <q-input 
            label="Tu nombre" stack-label
            placeholder="Tu nombre" 
            outlined 
            v-model="userName" 
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'El valor actual tiene que tener un valor']" 
            v-on:change="saveConfig"
        />
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
import { useStore } from 'vuex';

export default defineComponent({
    name:'ExportImport',
    setup(){
        const $q = useQuasar();
        const store = useStore();
        const localData = ref('');
        const firstAmount= ref(store.getters.getConfig.firstAmount);
        const userName= ref(store.getters.getConfig.userName);

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


        const saveConfig = ()=>{
            store.dispatch('addConfig',{
                firstAmount: firstAmount.value,
                userName: userName.value
            });
        };

        return{
            localData,
            saveChanges,
            firstAmount,
            saveConfig,
            userName
        }
    }
})
</script>

<style>

</style>