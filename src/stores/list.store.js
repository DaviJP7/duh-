import { defineStore } from "pinia";
import { ref } from "vue";
export const useListStore = defineStore("list", () => {
  const list = ref({});
  
  const createList = (listName) => {
    list.value = {
      name: listName,
      description: ''
    }
    return list.value
  }

  const destroyLists = () => {
    list.value = {}
    return true
  }
  
  return {
    list,
    createList,
    destroyLists
  }
}, {
  persist: true
})