<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
      <AddFormComponent/>
      <q-page-sticky expand class="q-pa-lg" position="bottom" :offset="[0, 0]">
        <q-btn-group class="full-width" rounded>
          <q-btn v-on:click="active=1" :class="{'bg-secondary':active==1}" size="md" padding="sm" color="primary" class="full-width" label="" icon="home" to="/" />
          <q-btn v-on:click="active=2" :class="{'bg-secondary':active==2}" size="md" padding="sm" color="primary" class="full-width" label="" icon="timeline" to="/timeline" />
          <q-btn v-on:click="active=3" :class="{'bg-secondary':active==3}" size="md" padding="sm" color="primary" class="full-width" label="" icon="eject" to="/expimp" />
        </q-btn-group>
      </q-page-sticky>
    </q-page-container>
  </q-layout>
</template>

<script>

import { defineComponent,ref } from 'vue'
import AddFormComponent from '../components/AddForm.vue';

export default defineComponent({
  name: 'MainLayout',
  components: {AddFormComponent},
  setup () {
    const active = ref(1);

    return {
      active
    }
  }
})
</script>
