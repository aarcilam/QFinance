<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container class="page-cont">
      <router-view />
      <AddFormComponent/>
      <BottomNavComponent/>
    </q-page-container>
  </q-layout>
</template>

<script>

import { defineComponent } from 'vue'
import AddFormComponent from '../components/AddForm.vue';
import BottomNavComponent from '../components/BottomNav.vue';

export default defineComponent({
  name: 'MainLayout',
  components: {AddFormComponent,BottomNavComponent},
  setup () {

  }
})
</script>

<style scoped>
  .page-cont{
    margin-bottom: 150px;
  }
</style>
