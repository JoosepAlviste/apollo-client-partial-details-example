<template>
  <div v-if="loading">Loading...</div>

  <div v-else-if="character" class="details">
    <h2>
      {{ character.name }} (<router-link to="/">Back to list</router-link>)
    </h2>
    <img v-if="character.image" :src="character.image" class="image" />
    <div>Gender: {{ character.gender }}</div>
    <div>Status: {{ character.status }}</div>
    <div>Species: {{ character.species }}</div>
    <div>
      <div>Episodes:</div>
      <ul class="episodes-list">
        <li v-for="episode in character.episode">
          {{ episode?.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable';
import { computed } from 'vue';
import { graphql } from '../gql';

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

const character = computed(() => result.value?.character);
</script>

<style scoped>
.details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.image {
  width: 15rem;
  height: 15rem;
}

.episodes-list {
  margin: 0;
}
</style>
