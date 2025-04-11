<script setup>
import { computed, ref } from "vue";
import { useListStore } from "@/stores/list.store";
import { useRouter } from "vue-router";
const tasks = ref([]);
const newTask = ref(null);
const listStore = useListStore();
const router = useRouter();
const dialog = ref(false);
const completedTasks = computed(() => {
  return tasks.value.filter((task) => task.done).length;
});

const progress = computed(() => {
  return (completedTasks.value / tasks.value.length) * 100;
});

const remainingTasks = computed(() => {
  return tasks.value.length - completedTasks.value;
});

function create() {
  if (!newTask.value) return;
  tasks.value.push({
    done: false,
    text: newTask.value,
  });
  newTask.value = null;
}

function deleteTask(t) {
  tasks.value.splice(t, 1);
}

function destroyList() {
  listStore.destroyLists();
  router.push({ name: "home" });
}

function print() {
  window.print();
}
</script>

<template>
  <v-dialog v-model="dialog" max-width="480">
    <v-card>
      <template v-slot:text>
        <div>Deseja realmente apagar sua lista?</div>
        <div class="d-flex ga-2 justify-center mt-2">
          <v-btn
            class="float-right"
            color="red"
            text="Sim"
            @click="destroyList()"
          />
          <v-btn
            class="float-right"
            color="blue"
            text="Não"
            @click="dialog = false"
          />
        </div>
      </template>
    </v-card>
  </v-dialog>

  <v-container style="max-width: 600px" class="mt-10">
    <v-row align="center" justify="space-between" class="mb-4">
      <span class="text-h4">{{ listStore.list.name }}</span>
      <div>
        <v-btn icon="mdi-printer" variant="text" @click="print"></v-btn>
        <v-btn icon="mdi-delete" variant="text" @click="dialog = true"></v-btn>
      </div>
    </v-row>
    <v-text-field
      v-model="newTask"
      label="Adicione o item aqui!"
      variant="solo"
      @keydown.enter="create"
    >
      <template v-slot:append-inner>
        <v-btn
          v-show="newTask"
          icon="mdi-plus-circle"
          variant="text"
          @click="create"
        ></v-btn>
      </template>
    </v-text-field>

    <h2 class="text-h4 text-success ps-4">
      Tarefas:&nbsp;
      <span :key="`tasks-${tasks.length}`">
        {{ tasks.length }}
      </span>
    </h2>

    <v-divider class="mt-4"></v-divider>

    <v-row align="center" class="my-1">
      <strong class="mx-4 text-info-darken-2">
        Restantes: {{ remainingTasks }}
      </strong>

      <v-divider vertical></v-divider>

      <strong class="mx-4 text-success-darken-2">
        Completas: {{ completedTasks }}
      </strong>

      <v-spacer></v-spacer>

      <v-progress-circular
        v-if="tasks.length > 0"
        v-model="progress"
        class="me-2"
      ></v-progress-circular>
    </v-row>

    <v-divider class="mb-4"></v-divider>

    <v-card v-if="tasks.length > 0">
      <template v-for="(task, i) in tasks" :key="`${i}-${task.text}`">
        <v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>

        <v-list-item @click="task.done = !task.done">
          <template v-slot:prepend>
            <v-checkbox-btn v-model="task.done" color="grey"></v-checkbox-btn>
          </template>

          <v-list-item-title>
            <span :class="task.done ? 'text-grey' : 'text-primary'">{{
              task.text
            }}</span>
          </v-list-item-title>

          <template v-slot:append>
            <v-icon @click.stop.prevent="deleteTask(i)" color="error"
              >mdi-trash-can</v-icon
            >
            <v-icon v-if="task.done" color="success"> mdi-check </v-icon>
          </template>
        </v-list-item>
      </template>
    </v-card>
  </v-container>
</template>

<style scoped></style>
