<template>
  <h1>Details (<router-link to="/">Back to list</router-link>)</h1>

  <div>{{ id }}</div>
</template>

<script setup lang="ts">
defineProps<{
  id: string;
}>();
</script>
