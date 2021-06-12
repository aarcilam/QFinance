<template>
    <template v-if="rows.length>0">
        <h5 class="text-subtitle2  text-center">{{type}}</h5>
        <q-list separator>
            <q-slide-item v-for="(row, index) in rows" :key="row.title" @action="setTimer" @left="onLeft(index)" @right="onRight(index)" left-color="secondary" right-color="red">
                <template v-slot:left>
                    <q-icon name="archive" /> Archivar
                </template>
                <template v-slot:right>
                    <q-icon name="delete" /> Eliminar
                </template>

                <q-item>
                <q-item-section avatar>
                    <q-avatar 
                    :color="row.type == 'ingreso' ? 'green' : 'red' "
                    :icon="row.type == 'ingreso' ? 'savings' : 'price_check' "
                    text-color="white" />
                </q-item-section>
                <q-item-section>{{row.title}} <strong>{{moneyFormat(row.amount)}}</strong></q-item-section>
                </q-item>
            </q-slide-item>
        </q-list>
        <q-dialog v-model="confirmDelete" persistent>
            <q-card>
                <q-card-section class="row items-center">
                    <span class="q-ml-sm">Confirma para eliminar</span>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="Cancelar" color="primary" v-close-popup />
                    <q-btn flat label="Eliminar" color="primary" v-close-popup v-on:click="deleteItem" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </template>
    <template v-if="rows.length==0">
        <h6 class="text-subtitle2 text-center">No tienes {{type}} creados</h6>
    </template>
</template>

<script>
import { onBeforeUnmount,ref } from 'vue';
import { useStore } from 'vuex';
import {moneyFormat} from '../helper';

export default {
    name:'SlideList',
    props: ['rows','type'],
    setup(props){
        const store = useStore();
        let timer
        const selectedIndex = ref(null)
        const confirmDelete = ref(false)

        function finalize (reset) {
        timer = setTimeout(() => {
            reset()
        }, 1000)
        }

        onBeforeUnmount(() => {
        clearTimeout(timer)
        })

        const deleteItem = ()=>{
            store.dispatch('deleteValue',{
                type:props.type,
                key:selectedIndex.value
            });
            selectedIndex.value = null;
        }

        const setTimer = ({reset}) => {
            finalize(reset)
        }


        const onLeft = (key) => {
            console.log('archive',key);
            
        }

        const onRight = (key) => {
            selectedIndex.value = key;
            confirmDelete.value = true;
        }

        return {
            onLeft,
            onRight,
            deleteItem,
            moneyFormat,
            setTimer,
            confirmDelete
        }
    }
}
</script>

<style>

</style>