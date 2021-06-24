<template>
    <template v-if="rows.length>0">
        <h5 class="text-subtitle2  text-center">{{type}} - ({{rows.length}})</h5>
        <q-list separator>
            <q-slide-item v-on:click="showMore(row,index)" v-for="(row, index) in formatedRows" :key="row.title" @action="setTimer" @left="onLeft(index)" @right="onRight(index)" left-color="secondary" right-color="red">
                <template v-slot:left>
                    <q-icon name="archive" /> Archivar
                </template>
                <template v-slot:right>
                    <q-icon name="delete" /> Eliminar
                </template>

                <q-item>
                <q-item-section v-if="row.type=='ingreso'||row.type=='gasto'" avatar>
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
        <div class="text-center q-mt-md">
            <q-btn color="primary" rounded v-if="rows.length>5" :label="toggleButton" v-on:click="toggleShow" class="q-mb-lg"/>
        </div>
    </template>
    <template v-if="rows.length==0">
        <h6 class="text-subtitle2 text-center">No tienes {{type}} creados</h6>
    </template>
</template>

<script>
import { onBeforeUnmount,ref,computed } from 'vue';
import { useStore } from 'vuex';
import {moneyFormat,reverseArr} from '../helper';
import {useRouter} from 'vue-router';

export default {
    name:'SlideList',
    props: ['rows','type'],
    setup(props){
        const store = useStore();
        const router = useRouter();
        let timer
        const selectedIndex = ref(null)
        const confirmDelete = ref(false)
        const showAll = ref(false)

        const formatedRows = computed(()=>{
            let rows = reverseArr(props.rows);
            if(showAll.value){
                return rows;
            }
            return rows.slice(0, 5);
        })

        const toggleButton = computed(()=>{
            if(showAll.value){
                return 'Ver menos';
            }
            return 'Ver más';
        })

        const toggleShow=()=>{
            showAll.value = !showAll.value;
        }

        function finalize (reset) {
        timer = setTimeout(() => {
            reset()
        }, 1000)
        }

        onBeforeUnmount(() => {
        clearTimeout(timer)
        })

        const deleteItem = ()=>{
            let index = (props.rows.length-1)-selectedIndex.value;
            console.log(selectedIndex.value,index);
            store.dispatch('deleteValue',{
                type:props.type,
                key:index
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

        const showMore = (item,index)=>{
            console.log(item);
            router.push({ name: 'details', params: { index:index,date: item.date,title:item.title,amount:item.amount,type:item.type } })
        }

        return {
            onLeft,
            onRight,
            deleteItem,
            moneyFormat,
            setTimer,
            confirmDelete,
            showMore,
            formatedRows,
            showAll,
            toggleButton,
            toggleShow
        }
    }
}
</script>

<style>

</style>