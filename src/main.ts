import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
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

const app = createApp(App);

app.use(router);

app.mount('#app');
