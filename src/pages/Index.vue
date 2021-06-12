<template>
  <q-page padding>
    <h5 class="text-center text-h6 q-my-xl">Hola, {{userName}}</h5>
    <div class="row">
      <div class="col-12 col-sm-6 q-pa-md">
        <q-markup-table dark class="bg-primary">
          <thead>
            <tr>
              <th class="text-left">Dinero incial</th>
              <th class="text-right">{{moneyFormat(firstAmount)}}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="text-left">Ingresos</td>
              <td class="text-right">{{moneyFormat(ingresosSum)}}</td>
            </tr>
            <tr>
              <td class="text-left">Gastos</td>
              <td class="text-right">{{moneyFormat(gastosSum)}}</td>
            </tr>
            <tr>
              <td class="text-left">Total actual</td>
              <td class="text-right">{{moneyFormat(actualAmount)}}</td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
    </div>
    <div class="row q-col-gutter-sm">
      <div class="col-12 col-sm-6">
        <SlideListComponent :rows="ingresos" type="ingresos"/>
      </div>
      <div class="col-12 col-sm-6">
        <SlideListComponent :rows="gastos" type="gastos"/>
      </div>
    </div>
    <br>
    <br>
    <div class="row q-col-gutter-sm">
      <div class="col-12 col-sm-6">
        <TableComponent :rows="pendientes" :columns="columns" type="pendientes" @saveChanges="saveChanges" />
      </div>
      <div class="col-12 col-sm-6">
        <TableComponent :rows="deudas" :columns="columns" type="deudas" @saveChanges="saveChanges" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { useQuasar } from 'quasar';
import { useStore } from 'vuex';
import { defineComponent,ref,onMounted,computed } from 'vue';
import {moneyFormat} from '../helper';

import TableComponent from '../components/Table.vue';
import SlideListComponent from '../components/SlideList.vue';

export default defineComponent({
  name: 'PageIndex',
  components: {TableComponent,SlideListComponent},
  setup(){
    const $q = useQuasar();
    const store = useStore();
    store.dispatch('getLocal');   
    const firstAmount= store.getters.getConfig.firstAmount;
    const userName= store.getters.getConfig.userName;
    const ingresos = store.getters.getIngresos;
    const gastos = store.getters.getGastos;
    const pendientes = store.getters.getPendientes;
    const deudas = store.getters.getDeudas;
    const config = store.getters.getConfig;

    const columns = [
      { name: 'date', label: 'Fecha', field: 'date', sortable: true },
      { name: 'title', label: 'Titulo', field: 'title' },
      { name: 'amount', label: 'Cantidad',field: 'amount', sortable: true, format: val => moneyFormat(val) },
      { name: 'actions', label: 'Acciones', field: 'actions' },
    ];

    $q.dark.set(true);

    const ingresosSum = computed(() => {
      return getSumByKey(ingresos,'amount');
    });

    const gastosSum = computed(() => {
      return getSumByKey(gastos,'amount');
    });

    const actualAmount = computed(()=>{
      return Number(config.firstAmount)+Number(ingresosSum.value)-Number(gastosSum.value);
    });

    onMounted(() => {
      
    })

    const getSumByKey = (arr, key) => {
      return arr.filter(({archived}) => archived === false).reduce((accumulator, current) => accumulator + Number(current[key]), 0);
    }

    const saveChanges = ()=>{
      store.dispatch('saveLocal');
    };

    return{
      moneyFormat,
      config,
      ingresos,
      columns,
      gastos,
      ingresosSum,
      gastosSum,
      actualAmount,
      saveChanges,
      pendientes,
      deudas,
      firstAmount,
      userName
    }
  }
})
</script>
