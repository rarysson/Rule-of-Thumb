<script setup lang="ts">
import AppNav from "./components/AppNav.vue";
import AppHeader from "./components/AppHeader.vue";
import AppBannerTop from "./components/AppBannerTop.vue";
import AppBannerBottom from "./components/AppBannerBottom.vue";
import AppFooter from "./components/AppFooter.vue";
</script>

<template>
  <AppNav />
  <AppHeader />
  <div class="max-centered">
    <AppBannerTop />

    <main role="main">
      <!-- Start: Implementation -->
      👉 Your code goes here 👈
      <!-- End: Implementation -->
    </main>

    <AppBannerBottom />

    <hr role="separator" />

    <AppFooter />
  </div>
</template>
