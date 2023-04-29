<template>
	<div class="flex justify-center mt-10">
		<div
			class="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 max-w-xl w-full flex-col gap-4 border justify-center"
		>
			<label for="users" class="block mb-2 text-sm font-medium text-gray-900"
				>Select an option</label
			>
			<select
				v-model="selectedUser"
				v-on:change="updateUser"
				v-for="user in users"
				:key="user.id"
				:id="'users_' + user.id"
				class="border-2 border-gray-300 p-2 rounded-lg my- mx-10 hover:border-blue-600 cursor-pointer transition ease-in-out"
			>
				<option :value="null" selected>Choose a user</option>
				<option v-for="user in users" :key="user.id" :value="user">
					{{ user.username }}
				</option>
			</select>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	data() {
		return {
			selectedUser: null,
		};
	},
	methods: {
		updateUser() {
			this.$emit('user-selected', this.selectedUser)
		}
	},
	computed: {
		...mapGetters('users', { findUsersInStore: 'find' }),
		users() {
			return this.findUsersInStore({ query: {} }).data;
		},
	},
};
</script>

<style lang="scss" scoped></style>
