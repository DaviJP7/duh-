<script setup>
import { ref, watch } from "vue";
const welcomeMessage = `Bem-vindo ao Duh!`;
const items = [
  {
    title: "Início",
    value: "home",
  },
  {
    title: "Listas",
    value: "list",
  },
];

const dropDownItens = ref([
  {
    title: "Sair",
    value: "auth",
  },
]);

const drawer = ref(false);
const group = ref(null);

watch(group, () => {
  drawer.value = false;
});
</script>

<template>
  <v-layout>
    <v-app-bar color="primary">
      <v-toolbar-title>{{ welcomeMessage }}</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <slot />
    </v-main>
  </v-layout>
</template>

<style scoped></style>
