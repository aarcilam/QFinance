<template>
  <q-page padding>
    <div class="row">
      <div class="col-6 q-py-xl">
        <q-form
          @submit="onSubmit"
          class="q-gutter-md"
        >
          <q-input placeholder="Titulo" outlined v-model="title" />
          <q-input placeholder="Cantidad" outlined v-model="amount" />
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
    </div>
    <div class="row q-col-gutter-sm">
      <div class="col-12">
        <q-btn color="primary" label="Ver linea de tiempo" to="/timeline"/>
      </div>
      <div class="col-6">
        <q-table
          title="Table Title"
          :rows="ingresos"
          :columns="columns"
          row-key="id"
        />
      </div>
      <div class="col-6">
        <q-table
          title="Table Title"
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

const columns = [
  { name: 'id', label: 'Id', field: 'id', sortable: true },
  { name: 'title', label: 'title', field: 'title' },
  { name: 'amount', label: 'amount', field: 'amount', sortable: true }
];

export default defineComponent({
  name: 'PageIndex',
  setup(){
    const $q = useQuasar();
    const title = ref('');
    const amount = ref('');
    const type = ref(false);
    const ingresos = ref([]);
    const gastos = ref([]);

    $q.dark.set(true);

    const typeName = computed(() => {
      let name='ingreso';
      if(type.value==true){
        name='gasto';
      }
      return name;
    })
    
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
          date:'lun',
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
      
      
      reset();
    };

    return{
      title,
      amount,
      type,
      typeName,
      ingresos,
      columns,
      gastos,
      onSubmit
    }
  }
})
</script>
