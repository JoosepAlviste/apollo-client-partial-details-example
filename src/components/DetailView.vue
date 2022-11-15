<template>
  <div v-if="!character && loading">Loading...</div>

  <div v-else-if="character" class="details">
    <h2>
      {{ character.name }} (<router-link to="/">Back to list</router-link>)
    </h2>
    <img v-if="character.image" :src="character.image" class="image" />
    <template v-if="areDetailsLoaded(character)">
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
    </template>
    <div v-else-if="loading">Loading...</div>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable';
import { computed } from 'vue';
import { graphql } from '../gql';
import {
  CharacterQuery,
  CharacterQueryVariables,
  CharactersQuery,
} from '../gql/graphql';

const props = defineProps<{
  id: string;
}>();

/**
 * Type of a single character from the list query - our "partial" data.
 */
type CharacterWithPartialData = NonNullable<
  NonNullable<NonNullable<CharactersQuery['characters']>['results']>[number]
>;

/**
 * Type of a character with all the requested fields set - our "full" data.
 */
type CharacterWithFullData = NonNullable<CharacterQuery['character']>;

/**
 * We need to manually type the query response since GraphQL Code Generator is
 * not smart enough to type such a complicated workflow for us.
 *
 * The response can include either the "partial" data or the "full" data.
 */
type PartialCharacterQueryResponse = {
  __typename?: 'Query';
  character?: CharacterWithPartialData | CharacterWithFullData | null;
};

const { result, loading } = useQuery<
  PartialCharacterQueryResponse,
  CharacterQueryVariables
>(
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
  { characterId: props.id },
  {
    // This allows Apollo Client to return us data in `result` even if not all
    // the required fields exist.
    //
    // Read more about this option in the Apollo Client docs:
    // https://www.apollographql.com/docs/react/data/queries/#returnpartialdata
    returnPartialData: true,
  }
);

const character = computed(() => result.value?.character);

/**
 * Check if the details for the character have been loaded.
 *
 * Make use of a custom type guard to make it easier to determine which type of
 * data we're dealing with in the template.
 *
 * Read more about TypeScript type predicates here:
 * https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
 */
const areDetailsLoaded = (
  character: NonNullable<PartialCharacterQueryResponse['character']>
): character is CharacterWithFullData => {
  return Boolean('episode' in character);
};
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
