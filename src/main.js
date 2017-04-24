// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import router from './router';
import VueResource from 'vue-resource';
import VueMaterial from 'vue-material';
import config from './config.js';

import 'vue-material/dist/vue-material.css'
import * as VueGoogleMaps from 'vue2-google-maps';

import Navbar from './components/navbar/Navbar.vue';


Vue.use(VueResource);
Vue.use(VueResource);
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyA8J4-gVgiK2sGYMIk722W6-JMmSddUewk'
  }
});

Vue.http.options.root = config.api;

Vue.component('navbar', Navbar);

Vue.use(VueMaterial);



Vue.material.registerTheme('default', {
  primary: 'blue',
  accent: 'blue',
  warn: 'red',
  background: 'white'
})

new Vue({
  el: '#app',
  router,
  watch: {
    '$route'(to, from) {
      // Call resizePreserveCenter() on all maps
      Vue.$gmapDefaultResizeBus.$emit('resize')
    }
  }
});



