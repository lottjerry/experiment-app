import Vue from 'vue';
import Vuex from 'vuex';
import feathersVuex from 'feathers-vuex';
import feathersClient from '../fathers-client';

const { service, auth, FeathersVuex } = feathersVuex(feathersClient, {
	idField: 'id', /// OMFG the problem was i had to change idField: '_id' to 'id'
});

Vue.use(Vuex);
Vue.use(FeathersVuex);

export default new Vuex.Store({
	plugins: [
		// Create user with the user service then call auth on that user
		service('users', {
			//debug: true
		}),
		service('messages', {
			debug: true,
			preferUpdate: true,
		}),
		// Setup the auth plugin.
		auth({ userService: 'users' }),
	],
});
