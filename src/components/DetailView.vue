<template>
  <h1>Details</h1>
  <div>{{ id }}</div>
</template>

<script setup lang="ts">
defineProps<{
  id: string;
}>();
</script>
