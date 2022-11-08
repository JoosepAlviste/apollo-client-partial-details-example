<template>
  <h1>Details (<router-link to="/">Back to list</router-link>)</h1>

  <div v-if="loading">Loading...</div>

  <div v-else-if="result">
    <div>Name: {{ result.character.name }}</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  id: string;
}>();

const { result, loading } = useQuery(
  graphql(`
    query character($characterId: ID!) {
      character(id: $characterId) {
        id
        name
        image
        gender
        status
        species
        episode {
          id
          name
        }
      }
    }
  `),
  { characterId: props.id }
);
</script>
