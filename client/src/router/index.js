import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginView from '../views/LoginView.vue';
import MessagesView from '../views/MessagesView.vue';
import ProfileView from '../views/ProfileView.vue';
import store from '../store/index.js'

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'login',
		component: LoginView,
	},
	{
		path: '/signup',
		name: 'signup',
		// route level code-splitting
		// this generates a separate chunk (signup.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "signup" */ '../views/SignupView.vue'),
	},
	{
		path: '/messages',
		name: 'messages',
		component: MessagesView,
		beforeEnter(to, from, next) {
			//console.log(store);
			store
				.dispatch('auth/authenticate')
				.then(() => {
					next();
				})
				.catch(() => {
					next('/');
				});
		},
	},

	{
		path: '/profile',
		name: 'profile',
		component: ProfileView,
		beforeEnter(to, from, next) {
			//console.log(store);
			store
				.dispatch('auth/authenticate')
				.then(() => {
					next();
				})
				.catch(() => {
					next('/');
				});
		},
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
