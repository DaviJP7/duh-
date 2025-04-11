<script setup>
import { useRouter } from "vue-router";
import { useListStore } from "@/stores/list.store.js";
import { shallowRef, nextTick } from "vue";

const listStore = useListStore();
const router = useRouter();
const dialog = shallowRef(false);
const listName = shallowRef("");
const input = shallowRef('')
const newList = async () => {
  dialog.value = false;
  listStore.createList(listName.value);
  router.push({ name: "list" });
};
const showModal = async() => {
  dialog.value = true;
  await nextTick()
  input?.value?.focus()
 
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="12" class="text-center">
        <h1>Seja bem-vindo ao Duh</h1>
        <p>
          <span class="font-weight-bold">Duh!</span>
          é uma ferramenta online para criar tarefas rápidas e intuitivas no dia
          a dia. Use, crie e compartilhe listas com facilidade.
        </p>
      </v-col>
      <v-col class="text-center" cols="12" md="12">
        <v-card>
          <v-card-title>Lista de Tarefas</v-card-title>
          <v-card-text>
            <p>Adicione suas tarefas aqui</p>
            <v-btn color="primary" @click="showModal">
              Criar lista
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="480">
      <v-card>
        <template v-slot:text>
          <v-text-field
            label="Qual o nome da sua lista?"
            variant="outlined"
            v-model="listName"
            ref="input"
            @keydown.enter="newList()"
          ></v-text-field>
          <v-btn
            class="float-right"
            color="blue"
            text="OK"
            @click="newList()"
          />
        </template>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style scoped></style>
