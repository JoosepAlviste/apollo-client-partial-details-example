<template>
  <h2>Characters</h2>

  <div v-if="loading">Loading...</div>

  <div v-else-if="characters">
    <ul class="list">
      <li v-for="character in characters">
        <router-link
          v-if="character"
          :to="`/${character.id}`"
          class="list-item"
        >
          <img v-if="character.image" class="image" :src="character.image" />
          {{ character.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import { graphql } from '../gql';

const { result, loading } = useQuery(
  graphql(`
    query characters {
      characters {
        results {
          id
          image
          name
        }
      }
    }
  `)
);

const characters = computed(() => result.value?.characters?.results);
</script>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.list-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.image {
  width: 3rem;
  height: 3rem;
}
</style>
