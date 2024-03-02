<script setup lang="ts">
import { ref, watch, onBeforeMount } from "vue";
import { useBreakpoints } from "@vueuse/core";

import AppNav from "./components/AppNav.vue";
import AppHeader from "./components/AppHeader.vue";
import AppBannerTop from "./components/AppBannerTop.vue";
import AppBannerBottom from "./components/AppBannerBottom.vue";
import AppFooter from "./components/AppFooter.vue";
import CelebrityCard from "./components/CelebrityCard.vue";
import ViewMenu from "./components/ViewMenu.vue";

import { fetchCelebrities } from "./services/api";

const breakpoints = useBreakpoints({
  mobile: 0,
  tablet: 768,
  desktop: 1100,
});

const viewMode = ref<ViewMode>(breakpoints.tablet.value ? "list" : "grid");
const celebrities = ref<Celebrity[]>([]);

watch(breakpoints.tablet, (isTablet) => {
  if (!isTablet) {
    viewMode.value = "grid";
  }
});

function getAllCelebrities() {
  celebrities.value = fetchCelebrities();
}

onBeforeMount(getAllCelebrities);
</script>

<template>
  <AppNav />
  <AppHeader />
  <div class="max-centered">
    <AppBannerTop />

    <main role="main">
      <header class="header">
        <h3 class="title">Previous Rulings</h3>
        <ViewMenu class="menu" v-model="viewMode" />
      </header>

      <div
        class="celebrities-container"
        :class="{ 'grid-mode': viewMode === 'grid' }"
      >
        <CelebrityCard
          v-for="celebrity in celebrities"
          :key="celebrity.id"
          :celebrity="celebrity"
          :extended="viewMode === 'list'"
          @update="getAllCelebrities"
        />
      </div>
    </main>

    <AppBannerBottom />

    <hr role="separator" />

    <AppFooter />
  </div>
</template>

<style scoped>
main {
  padding: 0 16px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.title {
  font-size: 1.5rem;
}

.menu {
  visibility: hidden;
}

.celebrities-container {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  overflow: initial;
}

.celebrities-container.grid-mode {
  display: flex;
  flex-direction: row;
  gap: 0.75rem;
  overflow: auto;
}

@media all and (min-width: 768px) {
  .menu {
    visibility: visible;
  }

  .celebrities-container {
    overflow: initial;
  }

  .celebrities-container.grid-mode {
    display: grid;
    gap: 1.3125rem;
    justify-items: center;
    grid-template-columns: 1fr 1fr;
  }
}

@media all and (min-width: 1100px) {
  .celebrities-container {
    gap: 1.125rem;
  }

  .celebrities-container.grid-mode {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
