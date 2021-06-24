<template>
    <q-page padding>
        <h4>{{title}}</h4>
        <strong>{{moneyFormat(amount)}}</strong>
    </q-page>
</template>

<script>
import {moneyFormat} from '../helper';
export default {
    name:'DetailPage',
    props: ['index','date','title','amount','type'],
    setup(props){

        return{
            moneyFormat
        }
    }
}
</script>

<style>

</style>