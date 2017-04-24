import Vue from 'vue';
import Router from 'vue-router';
import Main from '../components/main/Main.vue';
import Database from '../components/database/Database.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Main
    },
    {
      path: '/database',
      name: 'database',
      component: Database
    }
  ]
})
