<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
      <q-page-sticky expand class="q-pa-lg" position="bottom" :offset="[0, 0]">
        <q-btn-group class="full-width" rounded>
          <q-btn size="md" padding="sm" color="primary" class="full-width" label="" icon="home" to="/" />
          <q-btn size="md" padding="sm" color="primary" class="full-width" label="" icon="timeline" to="/timeline" />
          <q-btn size="md" padding="sm" color="primary" class="full-width" label="" icon="eject" to="/expimp" />
        </q-btn-group>
      </q-page-sticky>
    </q-page-container>
  </q-layout>
</template>

<script>

import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    
  },

  setup () {


    return {

    }
  }
})
</script>
