<script setup lang="ts">
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";

const emit = defineEmits<{
  (e: "update:modelValue", option: ViewMode): void;
}>();

defineProps<{
  modelValue: ViewMode;
}>();

const open = ref(false);
const target = ref(null);

function selectionOption(option: ViewMode) {
  emit("update:modelValue", option);
  open.value = false;
}

onClickOutside(target, () => (open.value = false));
</script>

<template>
  <div class="menu" ref="target">
    <button @click="open = !open">
      {{ modelValue }}
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
  width: 130px;
  height: 28px;
  font-size: 13px;
  font-family: inherit;
  text-transform: capitalize;
  background-color: var(--color-white);
  border: 2px solid var(--color-darker-gray);
}

@media all and (min-width: 1100px) {
  button {
    width: 170px;
    height: 36px;
  }
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
  bottom: -200%;
}

.options button {
  border-top: none;
}
</style>
