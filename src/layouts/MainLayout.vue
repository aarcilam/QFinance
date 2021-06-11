<template>
  <q-layout view="lHh Lpr lFf">
    <q-toolbar class="bg-primary text-white">

      <q-toolbar-title>QFinance</q-toolbar-title>

    </q-toolbar>
    <q-page-container>
      <router-view />
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

export default defineComponent({
  name: 'MainLayout',


  setup () {
    const active = ref(1);

    return {
      active
    }
  }
})
</script>
