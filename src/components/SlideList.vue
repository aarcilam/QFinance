<template>
    <template v-if="rows.length>0">
        <h5 class="text-subtitle2  text-center">{{type}}</h5>
        <q-list separator>
            <q-slide-item v-for="(row, index) in rows" :key="row.title"  @left="onLeft" left-color="secondary">
                <template v-slot:left>
                    <q-icon name="delete" v-on:click="deleteItem(index)" />
                    <!-- <q-icon name="edit" />
                    <q-icon name="done" /> -->
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
    </template>
    <template v-if="rows.length==0">
        <h6 class="text-subtitle2 text-center">No tienes {{type}} creados</h6>
    </template>
</template>

<script>
import { onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';
import {moneyFormat} from '../helper';

export default {
    name:'SlideList',
    props: ['rows','type'],
    setup(props,{emit}){
        const store = useStore();
        let timer

        function finalize (reset) {
        timer = setTimeout(() => {
            reset()
        }, 3000)
        }

        onBeforeUnmount(() => {
        clearTimeout(timer)
        })

        const deleteItem = (key)=>{
            store.dispatch('deleteValue',{
                type:props.type,
                key
            });
        }

        const onLeft = ({ reset }) => {
            finalize(reset)
        }

        return {
            onLeft,
            deleteItem,
            moneyFormat
        }
    }
}
</script>

<style>

</style>