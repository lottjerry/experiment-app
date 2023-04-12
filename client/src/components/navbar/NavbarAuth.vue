<template>
	<div>
		<div
			class="border-2 border-blue-600 bg-white text-blue-600 rounded-lg m-2 p-2 flex"
		>
			<img
				src="https://feathersjs.com/logo.svg"
				alt="FeathersJs"
				class="h-10"
			/>
			<div class="flex-auto p-2 flex">Feathers Playground</div>
			<div class="flex gap-2 justify-end">
				<div class="group self-center">
					<a
						v-for="user in users"
						:key="user.id"
						class="border-2 border-blue-600 bg-white hover:bg-blue-600 text-blue-600 hover:text-white font-bold py-1 px-5 rounded focus:outline-none focus:shadow-outline transition ease-in-out text-lg cursor-pointer"
						>{{ user.username }}</a
					>
					<div
						class="group-hover:block dropdown-menu absolute hidden h-auto transition ease-in-out"
					>
						<ul
							class="bg-white shadow px-2.5 py-8 mt-5 border-2 border-blue-600 rounded-lg blue-red-600"
						>
							<li class="py-1">
								<router-link
									to="/messages"
									class="border-2 border-blue-600 bg-white block font-bold text-base text-blue-600 hover:bg-blue-600 hover:text-white cursor-pointer rounded-lg p-1 hover:border-black"
									>Messages</router-link
								>
							</li>
							<li class="py-1">
								<router-link
									to="/profile"
									class="border-2 border-blue-600 bg-white block font-bold text-base text-blue-600 hover:bg-blue-600 hover:text-white cursor-pointer rounded-lg p-1 hover:border-black"
									>Profile</router-link
								>
							</li>
							<li class="py-1">
								<a
									@click="logout"
									class="border-2 border-blue-600 bg-white block font-bold text-base text-blue-600 hover:bg-blue-600 hover:text-white cursor-pointer rounded-lg p-1 hover:border-black"
									>Logout</a
								>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
	computed: {
		...mapGetters('users', { findUsersInStore: 'find' }),
		users() {
			return this.findUsersInStore({ query: {} }).data;
		},
	},
	methods: {
		...mapActions('auth', { authLogout: 'logout' }),
		async logout() {
			await this.authLogout();
			this.$router.go('/'); // changed .push to .go to refresh page. A quick fix because feathers does not automatically clear data.
		},
	},
};
</script>

<style lang="scss" scoped></style>
