<template>
    <q-page-sticky expand class="q-pa-lg" position="bottom" :offset="[0, 0]">
        <q-btn-group class="full-width" rounded>
            <q-btn v-on:click="active=1" :class="{'bg-secondary':active==1}" style="font-size: 17px;" padding="sm" color="primary" class="full-width" label="" icon="home" to="/" />
            <q-btn v-on:click="active=2" :class="{'bg-secondary':active==2}" style="font-size: 17px;" padding="sm" color="primary" class="full-width" label="" icon="timeline" to="/timeline" />
            <q-btn v-on:click="active=3" :class="{'bg-secondary':active==3}" style="font-size: 17px;" padding="sm" color="primary" class="full-width" label="" icon="settings" to="/expimp" />
        </q-btn-group>
    </q-page-sticky>
</template>

<script>
import { ref } from 'vue'
export default {
    name:'BottomNav',
    setup(){
        const active = ref(1);

        return {
            active
        }
    }
}
</script>

<style>

</style>