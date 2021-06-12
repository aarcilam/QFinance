<template padding>
    <q-dialog v-model="dialog" position="standard">
        <q-card>
            <q-card-section class="row items-center q-pb-none">
                <div class="text-h6">Añade un valor</div>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>
            <q-card-section>
                <q-form
                @submit="submitNewValue"
                class="q-gutter-md body--dark"
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
                    <q-btn v-close-popup color="primary" rounded :loading="submitting" icon="add" label="Añadir" type="submit">
                        <template v-slot:loading>
                        <q-spinner-facebook />
                        </template>
                    </q-btn>
                </q-form>
            </q-card-section>
        </q-card>
    </q-dialog>
    <q-page-sticky position="bottom-right" :offset="[25, 80]">
        <q-btn fab icon="add" color="accent" @click="openDialog" />
    </q-page-sticky>
    
</template>

<script>
import { useQuasar } from 'quasar';
import { useStore } from 'vuex';
import { ref,computed } from 'vue';

export default {
    name:'AddForm',
    setup(){
        const $q = useQuasar();
        const store = useStore();
        const title = ref('');
        const amount = ref('');
        const type = ref(false);
        const addForm = ref(null);
        const submitting = ref(false);
        const formValue = ref('1');
        const dialog = ref(false);

        function openDialog () {
            dialog.value = true
        }

        const typeName = computed(() => {
            let name='ingreso';
            if(type.value==true){
                name='gasto';
            }
            return name;
        })

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
            addForm.value.resetValidation();
            reset();
            submitting.value = false;
        };

        return{
            title,
            amount,
            type,
            addForm,
            submitting,
            formValue,
            typeName,
            submitNewValue,
            dialog,
            openDialog
        }
    }
}
</script>

<style>

</style>