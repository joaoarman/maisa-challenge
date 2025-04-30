<script setup>
import { ref, onMounted, onBeforeMount, watch, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import DefaultLayout from './components/DefaultLayout.vue'

const route = useRoute();
const router = useRouter();
const showLayout = ref(false);

</script>

<template>
  <v-app>
    <template v-if="showLayout">
      <DefaultLayout>
        <router-view></router-view>
      </DefaultLayout>
    </template>
    <template v-else>
      <router-view></router-view>
    </template>
  </v-app>
</template>

<style scoped>

</style>
