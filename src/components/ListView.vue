<template>
  <h1>List view</h1>
  <div>{{ a }}</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const a = ref(1);
</script>
