<template>
  <q-page padding>
    <div class="row">
      <div class="col-6 q-py-xl">
        <q-form
          @submit="onSubmit"
          class="q-gutter-md"
          ref="addForm"
        >
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
          />
          <q-btn color="primary" icon="check" label="Guardar" type="submit" />
        </q-form>
      </div>
      <div class="col-6">
          <h4>{{moneyFormat(config.firstAmount)}}</h4>
          <h5>Ingresos: {{moneyFormat(ingresosSum)}}</h5>
          <h5>Gastos: {{moneyFormat(gastosSum)}}</h5>
          <h2>{{moneyFormat(actualAmount)}}</h2>
      </div>
    </div>
    <div class="row q-col-gutter-sm">
      <div class="col-12">
        <q-btn color="primary" label="Ver linea de tiempo" to="/timeline"/>
      </div>
      <div class="col-6">
        <q-table
          title="Ingresos"
          :rows="ingresos"
          :columns="columns"
          row-key="id"
        />
      </div>
      <div class="col-6">
        <q-table
          title="Gastos"
          :rows="gastos"
          :columns="columns"
          row-key="id"
        />
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
    const addForm = ref(null);
    const config = ref({
      firstAmount: 1000000
    });

    const columns = [
      { name: 'date', label: 'Fecha', field: 'date', sortable: true },
      { name: 'title', label: 'Titulo', field: 'title' },
      { name: 'amount', label: 'Cantidad',field: 'amount', sortable: true, format: val => moneyFormat(val) }
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
      return config.value.firstAmount+ingresosSum.value-gastosSum.value;
    });

    const moneyFormat = string=>{
      let money = Number(string).toLocaleString('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
      });
      console.log(money);
      return money;
    };

    const getSumByKey = (arr, key) => {
      return arr.reduce((accumulator, current) => accumulator + Number(current[key]), 0)
    }
    
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

    const reset=()=>{
      title.value = '';
      amount.value = '';
      type.value = false;
    }

    const onSubmit = ()=>{
      let value = {
          date:new Date().toISOString().slice(0, 10),
          id:0,
          title: title.value,
          amount: amount.value
        };

      if(type.value==true){
        gastos.value.push(value);
        $q.localStorage.set('gastos', JSON.stringify(gastos.value));
      }else{
        ingresos.value.push(value);
        $q.localStorage.set('ingresos', JSON.stringify(ingresos.value));
      }

      $q.notify('Valor añadido')
      addForm.value.resetValidation();
      reset();
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
      onSubmit,
      ingresosSum,
      gastosSum,
      actualAmount,
      addForm
    }
  }
})
</script>
