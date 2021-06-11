<template>
  <q-page padding>
    <div class="row">
      <q-btn-dropdown
      color="secondary"
      icon="settings"
      >
        <div class="row no-wrap q-pa-md">
          <div class="column items-center">
            <q-form
              class="q-gutter-md"
              ref="addForm"
            >
              <q-input 
              placeholder="First amount" 
              outlined 
              v-model="firstAmount" 
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'El valor actual tiene que tener un valor']" 
              v-on:change="saveConfig"
              />
            </q-form>
            <br>
            <q-separator />
            <br>
            <q-btn color="negative" label="Eliminar datos" v-on:click="deleteInfo()"  />
          </div>
        </div>
      </q-btn-dropdown>
      <q-btn color="primary" label="Ver linea de tiempo" to="/timeline"/>
      <q-btn color="primary" label="datos en json" to="/expimp"/>
    </div>
    <div class="row">
      <div class="col-12 col-sm-6 q-py-xl">
        <q-form
          @submit="submitNewValue"
          class="q-gutter-md"
          ref="addForm"
        >
          <q-btn-toggle
            v-model="formValue"
            spread
            no-caps
            rounded
            unelevated
            toggle-color="primary"
            color=""
            text-color="white"
            :options="[
              {label: 'Movimiento', value: '1'},
              {label: 'Pendiente', value: '2'},
              {label: 'Deuda', value: '3'}
            ]"
          />
          <q-input 
          placeholder="Titulo" 
          outlined 
          v-model="title" 
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'El titulo tiene que tener un valor']" 
          />
          <q-input 
          placeholder="Cantidad" 
          outlined 
          v-model="amount" 
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Ingresa la cantidad']" 
          />
          <q-toggle
            v-model="type"
            checked-icon="price_check"
            color="red"
            :label="'Añadir un '+typeName"
            unchecked-icon="savings"
            v-if="formValue=='1'"
          />
          <q-btn color="primary" :loading="submitting" icon="add" label="Añadir" type="submit">
            <template v-slot:loading>
              <q-spinner-facebook />
            </template>
          </q-btn>
        </q-form>
      </div>
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
        <TableComponent :rows="ingresos" :columns="columns" type="ingresos" @deleteRow="deleteValue" @saveChanges="saveChanges" />
      </div>
      <div class="col-12 col-sm-6">
        <TableComponent :rows="gastos" :columns="columns" type="gastos" @deleteRow="deleteValue" @saveChanges="saveChanges" />
      </div>
    </div>
    <br>
    <br>
    <div class="row q-col-gutter-sm">
      <div class="col-12 col-sm-6">
        <TableComponent :rows="pendientes" :columns="columns" type="pendientes" @deleteRow="deleteValue" @saveChanges="saveChanges" />
      </div>
      <div class="col-12 col-sm-6">
        <TableComponent :rows="deudas" :columns="columns" type="deudas" @deleteRow="deleteValue" @saveChanges="saveChanges" />
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

export default defineComponent({
  name: 'PageIndex',
  components: {TableComponent},
  setup(){
    const $q = useQuasar();
    const store = useStore();
    store.dispatch('getLocal');   
    const title = ref('');
    const amount = ref('');
    const type = ref(false);
    const firstAmount= ref(store.getters.getConfig.firstAmount);
    const ingresos = store.getters.getIngresos;
    const gastos = store.getters.getGastos;
    const pendientes = store.getters.getPendientes;
    const deudas = store.getters.getDeudas;
    const config = store.getters.getConfig;
    const addForm = ref(null);
    const submitting = ref(false);
    const formValue = ref('1');

    const columns = [
      { name: 'date', label: 'Fecha', field: 'date', sortable: true },
      { name: 'title', label: 'Titulo', field: 'title' },
      { name: 'amount', label: 'Cantidad',field: 'amount', sortable: true, format: val => moneyFormat(val) },
      { name: 'actions', label: 'Acciones', field: 'actions' },
    ];

    $q.dark.set(true);

    const typeName = computed(() => {
      let name='ingreso';
      if(type.value==true){
        name='gasto';
      }
      return name;
    })

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

    const deleteInfo = ()=>{
      $q.notify({
          message: 'Quieres eliminar el localStorage',
          color: 'primary',
          avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
          actions: [
            { label: 'Eliminar', color: 'red', handler: () => { 
              $q.localStorage.set('alldata', JSON.stringify([]));
              gastos = [];
              ingresos = [];
            } },
            { label: 'No', color: 'white', handler: () => { /* ... */ } }
          ]
        })
    }

    const deleteValue = (type,key) =>{
      store.dispatch('deleteValue',{
              type,
              key
            });
      $q.notify('Dato eliminado');
    };

    const saveChanges = ()=>{
      store.dispatch('saveLocal');
    };

    const saveConfig = ()=>{
      store.dispatch('addConfig',{
        firstAmount: firstAmount.value
      });
    };

    const reset=()=>{
      title.value = '';
      amount.value = '';
      type.value = false;
    }

    const submitNewValue = ()=>{
      submitting.value = true;
      let value = {};
      switch (formValue.value) {
        case '1':
          value = {
            date:new Date().toISOString().slice(0, 10),
            title: title.value,
            amount: amount.value,
            type: typeName.value,
            archived: false
          };
          if(type.value==true){
            store.dispatch('addValue',{
              type:'gastos',
              value
            });
          }else{
            store.dispatch('addValue',{
              type:'ingresos',
              value
            });
          }
          break;
        case '2':
          value = {
            date:new Date().toISOString().slice(0, 10),
            title: title.value,
            amount: amount.value,
            archived: false
          };
          store.dispatch('addValue',{
            type:'pendientes',
            value
          });
          break;
        case '3':
          value = {
            date:new Date().toISOString().slice(0, 10),
            title: title.value,
            amount: amount.value,
            archived: false
          };
          store.dispatch('addValue',{
            type:'deudas',
            value
          });
          break;
      }

      $q.notify('Valor añadido')
      addForm.value.resetValidation();
      reset();
      submitting.value = false;
    };

    return{
      moneyFormat,
      config,
      title,
      amount,
      type,
      typeName,
      ingresos,
      columns,
      gastos,
      submitNewValue,
      ingresosSum,
      gastosSum,
      actualAmount,
      addForm,
      deleteInfo,
      submitting,
      saveChanges,
      deleteValue,
      formValue,
      pendientes,
      deudas,
      saveConfig,
      firstAmount
    }
  }
})
</script>
