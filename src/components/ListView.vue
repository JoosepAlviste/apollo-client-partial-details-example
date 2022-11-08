<template>
  <h1>List view</h1>
  <div>
    <ul>
      <li v-for="character in characters">
        <router-link :to="`/${character.id}`">{{ character.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import { graphql } from '../gql';

const { result } = useQuery(
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

const characters = computed(() => result.value.characters.results);
</script>
