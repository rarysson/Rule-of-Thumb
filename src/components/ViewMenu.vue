<script setup lang="ts">
import { ref, watch } from "vue";

const emit = defineEmits<{
  (e: "select", option: ViewMode): void;
}>();

const currentOption = ref<ViewMode>("list");
const open = ref(false);

function selectionOption(option: ViewMode) {
  currentOption.value = option;
  open.value = false;
}

watch(currentOption, (option) => {
  emit("select", option);
});
</script>

<template>
  <div class="menu">
    <button @click="open = !open">
      {{ currentOption }}
      <img src="../assets/img/triangle.svg" alt="menu" />
    </button>

    <div class="options" v-show="open">
      <button @click="selectionOption('list')">list</button>
      <button @click="selectionOption('grid')">grid</button>
    </div>
  </div>
</template>

<style scoped>
.menu {
  position: relative;
  width: fit-content;
}

button {
  cursor: pointer;
  position: relative;
  min-width: 130px;
  max-width: 170px;
  min-height: 28px;
  max-height: 36px;
  font-size: 13px;
  font-family: inherit;
  text-transform: capitalize;
  background-color: var(--color-white);
  border: 2px solid var(--color-darker-gray);
}

img {
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
}

.options {
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 9;
}

.options button {
  border-top: none;
}
</style>
