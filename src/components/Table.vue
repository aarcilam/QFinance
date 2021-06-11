<template>
    <q-table
        :title="type"
        :rows="rows"
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
                <q-icon name="delete" v-on:click="deleteItem(props.rowIndex)" />
            </div>
            </q-td>
        </template>
    </q-table>
</template>

<script>
import { defineComponent } from 'vue'
import { useStore } from 'vuex';

export default defineComponent({
    name:'TableComponent',
    props: ['rows','columns','type'],
    setup(props,{emit}){
        const store = useStore();

        const saveChanges=()=>{
            emit('saveChanges')
        };

        const deleteItem = (key)=>{
            store.dispatch('deleteValue',{
                type:props.type,
                key
            });
        }

        return {
            deleteItem,
            saveChanges
        }
    }
})
</script>

<style>

</style>