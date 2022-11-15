import { createApp, provide, h } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import { DefaultApolloClient } from '@vue/apollo-composable';
import { ApolloClient, gql } from '@apollo/client/core';
import { InMemoryCache } from '@apollo/client/cache';

import App from './App.vue';
import ListView from './components/ListView.vue';
import DetailView from './components/DetailView.vue';

const routes = [
  { path: '/', component: ListView },
  { path: '/:id', component: DetailView, props: true },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const apolloClient = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          character: {
            read(existing, { args, toReference, cache }) {
              if (!args || existing) {
                return existing;
              }

              const ref = toReference({
                __typename: 'Character',
                id: args.id,
              });

              // Check if we have an existing quote already saved into Apollo
              // Cache.
              const existingCharacter = cache.readFragment({
                id: ref?.__ref,
                fragment: gql`
                  fragment MyCharacter on Character {
                    id
                  }
                `,
              });

              return existingCharacter ? ref : undefined;
            },
          },
        },
      },
    },
  }),
});

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },

  render: () => h(App),
});

app.use(router);

app.mount('#app');
