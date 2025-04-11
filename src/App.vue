<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const defaultLayout = "default";

const layout = computed(
  () => `${router.currentRoute.value.meta.layout || defaultLayout}-layout`
);
</script>

<template>
  <v-app>
    <component :is="layout">
      <RouterView />
    </component>
  </v-app>
</template>

<style scoped></style>
