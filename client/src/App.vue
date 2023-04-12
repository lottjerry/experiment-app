<template>
	<div id="app">
		<nav class="p-5">
			<div v-if="!userPayload">
				<Navbar />
			</div>
			<div v-if="userPayload">
				<NavbarAuth />
			</div>
		</nav>
		<router-view />
	</div>
</template>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

nav a.router-link-exact-active {
	--tw-text-opacity: 1;
	background: rgb(37 99 235 / var(--tw-text-opacity));
	color: white;
}
</style>

<script>
import { mapActions, mapState } from 'vuex';
import Navbar from './components/navbar/Navbar.vue';
import NavbarAuth from './components/navbar/NavbarAuth.vue';

export default {
	components: {
		Navbar,
		NavbarAuth,
	},
	name: 'App',
	mounted() {
		this.authenticate() // authenticate using the existing jwt
			.then(() => {
				this.$router.push('./messages');
			})
			.catch(() => {});
	},
	computed: {
		...mapState('auth', { userPayload: 'payload' }),
	},
	methods: {
		...mapActions('auth', ['authenticate']),
	},
};
</script>
