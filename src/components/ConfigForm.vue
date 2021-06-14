<template>
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
    <h5 class="text-center text-h6 q-my-xl">Rango de fechas de la info</h5>
    <div class="text-center">
        <q-btn color="primary" rounded  icon="delete" v-if="datesRange!=null" label="quitar filtro de fechas" v-on:click="clearDates" class="q-mb-lg"/>
        <q-date @range-end="saveConfig" v-model="datesRange" range mask="YYYY-MM-DD" class="q-mb-lg" />
    </div>

</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';

export default {
    name:'ConfigForm',
    
    setup(){
        const store = useStore();
        const firstAmount= ref(store.getters.getConfig.firstAmount);
        const userName= ref(store.getters.getConfig.userName);
        const datesRange = ref(store.getters.getConfig.datesRange);

        const saveConfig = ()=>{
            store.dispatch('addConfig',{
                firstAmount: firstAmount.value,
                userName: userName.value,
                datesRange: datesRange.value
            });
        };

        const clearDates=()=>{
            datesRange.value = null;
            saveConfig();
        }

        return{
            firstAmount,
            userName,
            saveConfig,
            datesRange,
            clearDates
        }
    }
}
</script>

<style>

</style>