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
              v-model="config.firstAmount" 
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'El valor actual tiene que tener un valor']" 
              v-on:change="saveChanges"
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
      <q-btn color="positive" label="Guardar cambios" v-on:click="saveChanges" v-if="!savedChanges"/>
    </div>
    <div class="row">
      <div class="col-6 q-py-xl">
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
      <div class="col-6 q-pa-md">
        <q-markup-table dark class="bg-primary">
          <thead>
            <tr>
              <th class="text-left">Dinero incial</th>
              <th class="text-right">{{moneyFormat(config.firstAmount)}}</th>
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
      <div class="col-6">
        <q-table
          title="Ingresos"
          :rows="ingresos"
          :columns="columns"
          row-key="id"
        >
        <template v-slot:body-cell-title="props">
          <q-td :props="props">
            <div class="my-table-details">
              {{ props.value }}
              <q-popup-edit v-model="props.row.title">
                <q-input v-model="props.row.title" dense autofocus counter v-on:change="saveChanges" />
              </q-popup-edit> 
            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-amount="props">
          <q-td :props="props">
            <div class="my-table-details">
              {{ props.value }}
              <q-popup-edit v-model="props.row.amount">
                <q-input v-model="props.row.amount" dense autofocus counter v-on:change="saveChanges" />
              </q-popup-edit> 
            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <div class="my-table-details">
              <q-icon name="delete" v-on:click="deleteValue('ingresos',props.rowIndex)" />
            </div>
          </q-td>
        </template>
        </q-table>
      </div>
      <div class="col-6">
        <q-table
          title="Gastos"
          :rows="gastos"
          :columns="columns"
          row-key="id"
        >
        <template v-slot:body-cell-title="props">
          <q-td :props="props">
            <div class="my-table-details">
              {{ props.value }}
              <q-popup-edit v-model="props.row.title">
                <q-input v-model="props.row.title" dense autofocus counter v-on:change="saveChanges" />
              </q-popup-edit> 
            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-amount="props">
          <q-td :props="props">
            <div class="my-table-details">
              {{ props.value }}
              <q-popup-edit v-model="props.row.amount">
                <q-input v-model="props.row.amount" dense autofocus counter v-on:change="saveChanges" />
              </q-popup-edit> 
            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <div class="my-table-details">
              <q-icon name="delete" v-on:click="deleteValue('gastos',props.rowIndex)" />
            </div>
          </q-td>
        </template>
        </q-table>
      </div>
    </div>
    <br>
    <br>
    <div class="row q-col-gutter-sm">
      <div class="col-6">
        <q-table
          title="pendientes"
          :rows="pendientes"
          :columns="columns"
          row-key="id"
        >
        <template v-slot:body-cell-title="props">
          <q-td :props="props">
            <div class="my-table-details">
              {{ props.value }}
              <q-popup-edit v-model="props.row.title">
                <q-input v-model="props.row.title" dense autofocus counter v-on:change="saveChanges" />
              </q-popup-edit> 
            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-amount="props">
          <q-td :props="props">
            <div class="my-table-details">
              {{ props.value }}
              <q-popup-edit v-model="props.row.amount">
                <q-input v-model="props.row.amount" dense autofocus counter v-on:change="saveChanges" />
              </q-popup-edit> 
            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <div class="my-table-details">
              <q-icon name="delete" v-on:click="deleteValue('pendientes',props.rowIndex)" />
            </div>
          </q-td>
        </template>
        </q-table>
      </div>
      <div class="col-6">
        <q-table
          title="deudas"
          :rows="deudas"
          :columns="columns"
          row-key="id"
        >
        <template v-slot:body-cell-title="props">
          <q-td :props="props">
            <div class="my-table-details">
              {{ props.value }}
              <q-popup-edit v-model="props.row.title">
                <q-input v-model="props.row.title" dense autofocus counter v-on:change="saveChanges" />
              </q-popup-edit> 
            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-amount="props">
          <q-td :props="props">
            <div class="my-table-details">
              {{ props.value }}
              <q-popup-edit v-model="props.row.amount">
                <q-input v-model="props.row.amount" dense autofocus counter v-on:change="saveChanges" />
              </q-popup-edit> 
            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <div class="my-table-details">
              <q-icon name="delete" v-on:click="deleteValue('deudas',props.rowIndex)" />
            </div>
          </q-td>
        </template>
        </q-table>
      </div>
    </div>
  </q-page>
</template>

<script>
import { useQuasar } from 'quasar';

import { defineComponent,ref,onMounted,computed } from 'vue';

export default defineComponent({
  name: 'PageIndex',
  setup(){
    const $q = useQuasar();
    const title = ref('');
    const amount = ref('');
    const type = ref(false);
    const ingresos = ref([]);
    const gastos = ref([]);
    const pendientes = ref([]);
    const deudas = ref([]);
    const addForm = ref(null);
    const submitting = ref(false);
    const savedChanges = ref(true);
    const formValue = ref('1');
    const config = ref({
      firstAmount: null
    });

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
      return getSumByKey(ingresos.value,'amount');
    });

    const gastosSum = computed(() => {
      return getSumByKey(gastos.value,'amount');
    });

    const actualAmount = computed(()=>{
      return Number(config.value.firstAmount)+Number(ingresosSum.value)-Number(gastosSum.value);
    });

    onMounted(() => {
    
      let alldata = $q.localStorage.getItem('alldata');
      if(alldata){
        let data = JSON.parse(alldata);
        gastos.value = data.gastos;
        ingresos.value = data.ingresos;
        config.value = data.config;
        pendientes.value = data.pendientes;
        deudas.value = data.deudas;
      }
      
    })

    const moneyFormat = string=>{
      let money = Number(string).toLocaleString('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
      });
      return money;
    };

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
              gastos.value = [];
              ingresos.value = [];
            } },
            { label: 'No', color: 'white', handler: () => { /* ... */ } }
          ]
        })
    }

    const deleteValue = (type,key) =>{
      if(type=='gastos'){
        gastos.value.splice(key, 1);
      }
      if(type=='ingresos'){
        ingresos.value.splice(key, 1);
      }
      if(type=='pendientes'){
        pendientes.value.splice(key, 1);
      }
      if(type=='deudas'){
        deudas.value.splice(key, 1);
      }
      $q.notify('Dato eliminado');
      saveChanges();
    };

    const infoChange = ()=>{
      savedChanges.value = false;
    };

    const saveChanges = ()=>{
      $q.localStorage.set('alldata', JSON.stringify(
        {
          config:config.value,
          ingresos:ingresos.value,
          gastos:gastos.value,
          pendientes:pendientes.value,
          deudas:deudas.value
        }
        ));
      $q.notify('Datos guardados');
      savedChanges.value = true;
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
            type: typeName,
            archived: false
          };
          if(type.value==true){
            gastos.value.push(value);
          }else{
            ingresos.value.push(value);
          }
          break;
        case '2':
          value = {
            date:new Date().toISOString().slice(0, 10),
            title: title.value,
            amount: amount.value,
            archived: false
          };
          pendientes.value.push(value);
          break;
        case '3':
          value = {
            date:new Date().toISOString().slice(0, 10),
            title: title.value,
            amount: amount.value,
            archived: false
          };
          deudas.value.push(value);
          break;
      }

      saveChanges();

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
      savedChanges,
      infoChange,
      saveChanges,
      deleteValue,
      formValue,
      pendientes,
      deudas
    }
  }
})
</script>
