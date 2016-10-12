import Vue from 'vue';
import Resource from 'vue-resource';
import Router from 'vue-router';

import App from './components/App.vue';
import Home from './components/Home.vue';
import Detail from './components/Detail.vue';
import Question from './components/Question.vue';

// Install plugins
Vue.use(Router);
Vue.use(Resource);

// Set up a new router
var router = new Router();

// Route config
router.map({
  '/home':{
    name: 'home',
    component: Home
  },
  '/detail':{
  	name: 'detail',
  	component: Detail
  },
  '/question/:id':{
    name: 'question',
    component: Question
  }
})

// For every new route scroll to the top of the page
router.beforeEach(function () {
  window.scrollTo(0, 0)
})

// If no route is matched redirect home
router.redirect({
  '*': '/home'
})

// Start up our app
router.start(App, 'app')
