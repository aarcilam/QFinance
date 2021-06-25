<template>
  <q-page padding>
    <h5 class="text-center text-h6 q-my-xl">Hola, {{userName}}</h5>
    <div class="row">
      <div class="col-12 col-sm-6 q-pa-md">
        <h5 class="text-center" v-if="rangeFiltered!=null">Filtrado por {{rangeFiltered.from}}/{{rangeFiltered.to}}</h5>
        <q-markup-table dark class="bg-primary">
          <thead v-if="rangeFiltered==null">
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
            <tr v-if="rangeFiltered==null">
              <td class="text-left">Total actual</td>
              <td class="text-right">{{moneyFormat(actualAmount)}}</td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
      <div class="col-12 col-sm-6 q-pa-md">
        <q-markup-table dark class="bg-secondary">
          <tbody>
            <tr>
              <td class="text-left">Total Pendientes</td>
              <td class="text-right">{{moneyFormat(pendientesSum)}}</td>
            </tr>
            <tr>
              <td class="text-left">Total Deudas</td>
              <td class="text-right">{{moneyFormat(deudasSum)}}</td>
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
        <SlideListComponent :rows="pendientes" type="pendientes"/>
      </div>
      <div class="col-12 col-sm-6">
        <SlideListComponent :rows="deudas" type="deudas"/>
      </div>
    </div>
  </q-page>
</template>

<script>
import { useQuasar } from 'quasar';
import { useStore } from 'vuex';
import { defineComponent,ref,onMounted,computed } from 'vue';
import {moneyFormat} from '../helper';
import {useRouter} from 'vue-router'

import SlideListComponent from '../components/SlideList.vue';

export default defineComponent({
  name: 'PageIndex',
  components: {SlideListComponent},
  setup(){
    const $q = useQuasar();
    const store = useStore();
    const router = useRouter();
    store.dispatch('getLocal');   
    const firstAmount= store.getters.getConfig.firstAmount;
    const userName= store.getters.getConfig.userName;
    const ingresos = store.getters.getRangeIngresos;
    const gastos = store.getters.getRangeGastos;
    const pendientes = store.getters.getRangePendientes;
    const deudas = store.getters.getRangeDeudas;
    const config = store.getters.getConfig;

    onMounted(() => {
      if(firstAmount==0){
        router.push('/expimp');
      }
    })

    const columns = [
      { name: 'date', label: 'Fecha', field: 'date', sortable: true },
      { name: 'title', label: 'Titulo', field: 'title' },
      { name: 'amount', label: 'Cantidad',field: 'amount', sortable: true, format: val => moneyFormat(val) },
      { name: 'actions', label: 'Acciones', field: 'actions' },
    ];

    $q.dark.set(true);

    const rangeFiltered = computed(() => {
      return config.datesRange;
    });

    const ingresosSum = computed(() => {
      return getSumByKey(ingresos,'amount');
    });

    const gastosSum = computed(() => {
      return getSumByKey(gastos,'amount');
    });

    const pendientesSum = computed(() => {
      return getSumByKey(pendientes,'amount');
    });

    const deudasSum = computed(() => {
      return getSumByKey(deudas,'amount');
    });

    const actualAmount = computed(()=>{
      return Number(config.firstAmount)+Number(ingresosSum.value)-Number(gastosSum.value);
    });

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
      userName,
      rangeFiltered,
      pendientesSum,
      deudasSum
    }
  }
})
</script>
