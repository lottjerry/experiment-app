<template>
	<div class="flex justify-center">
		<div
			class="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 max-w-xl w-full flex-col gap-4 border justify-center"
		>
			<h1 class="text-3xl font-bold text-blue-600 p-6 underline">My Profile</h1>
			<div class="mb-6 p-3 flex justify-center">
				<div
					class="relative flex flex-row gap-2"
					v-for="user in users"
					:key="user.id"
				>
					<div v-if="!usernameEdit" class="flex gap-3">
						<div class="flex self-center">Username:</div>
						{{ user.username }}
					</div>
					<div v-else>
						<div v-if="!duplicateUsername">
							<FloatingInputStandard
								v-model="newUsername"
								label="New Username"
								type="text"
							/>
							<div v-if="!validUsername" class="flex gap-1 justify-center mt-3">
								<p class="text-orange-600">Invalid Username.</p>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="stroke-orange-600 flex self-center hover:cursor-pointer"
									width="18"
									height="18"
									viewBox="0 0 30 30"
									fill="none"
									stroke="#000000"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<circle cx="12" cy="12" r="10"></circle>
									<path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
									<line x1="12" y1="17" x2="12.01" y2="17"></line>
								</svg>
							</div>
						</div>
						<div v-else>
							<FloatingInputStandardWarning
								v-model="newUsername"
								label="New Username"
								type="text"
							/>
							<div v-if="!validUsername" class="flex gap-1 justify-center mt-3">
								<p class="text-orange-600">Invalid Username.</p>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="stroke-orange-600 flex self-center hover:cursor-pointer"
									width="18"
									height="18"
									viewBox="0 0 30 30"
									fill="none"
									stroke="#000000"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<circle cx="12" cy="12" r="10"></circle>
									<path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
									<line x1="12" y1="17" x2="12.01" y2="17"></line>
								</svg>
							</div>

							<div class="flex justify-center mt-4 gap-2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="stroke-red-600"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="#000000"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<polygon
										points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"
									></polygon>
									<line x1="12" y1="8" x2="12" y2="12"></line>
									<line x1="12" y1="16" x2="12.01" y2="16"></line>
								</svg>
								<p class="text-red-600">Username already exists.</p>
							</div>
						</div>
					</div>

					<svg
						v-if="!usernameEdit"
						@click="toggleUsernameEdit()"
						xmlns="http://www.w3.org/2000/svg"
						class="hover:stroke-blue-600 hover:cursor-pointer flex self-center"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="#000000"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon>
					</svg>
					<svg
						v-else
						@click="cancelUsernameEdit()"
						xmlns="http://www.w3.org/2000/svg"
						class="hover:stroke-red-600 hover:cursor-pointer flex self-center"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="#000000"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<line x1="18" y1="6" x2="6" y2="18"></line>
						<line x1="6" y1="6" x2="18" y2="18"></line>
					</svg>
				</div>
			</div>
			<div class="mb-6 flex justify-center">
				<div class="relative flex gap-4" v-for="user in users" :key="user.id">
					<div v-if="!emailEdit" class="flex gap-3">
						<div class="flex self-center">Email:</div>
						{{ user.email }}
					</div>
					<div v-else>
						<div v-if="!duplicateEmail">
							<FloatingInputStandard
								v-model="newEmail"
								label="New Email"
								type="text"
							/>
							<div v-if="!validEmail" class="flex gap-1 justify-center mt-3">
								<p class="text-orange-600">Invalid Email.</p>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="stroke-orange-600 flex self-center hover:cursor-pointer"
									width="18"
									height="18"
									viewBox="0 0 30 30"
									fill="none"
									stroke="#000000"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<circle cx="12" cy="12" r="10"></circle>
									<path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
									<line x1="12" y1="17" x2="12.01" y2="17"></line>
								</svg>
							</div>
						</div>
						<div v-else>
							<FloatingInputStandardWarning
								v-model="newUsername"
								label="New Username"
								type="text"
							/>
							<div v-if="!validEmail" class="flex gap-1 justify-center mt-3">
								<p class="text-orange-600">Invalid Email.</p>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="stroke-orange-600 flex self-center hover:cursor-pointer"
									width="18"
									height="18"
									viewBox="0 0 30 30"
									fill="none"
									stroke="#000000"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<circle cx="12" cy="12" r="10"></circle>
									<path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
									<line x1="12" y1="17" x2="12.01" y2="17"></line>
								</svg>
							</div>
							<div class="flex gap-2 justify-center mt-3">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="stroke-red-600"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="#000000"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<polygon
										points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"
									></polygon>
									<line x1="12" y1="8" x2="12" y2="12"></line>
									<line x1="12" y1="16" x2="12.01" y2="16"></line>
								</svg>
								<p class="text-red-600">Email already exists.</p>
							</div>
						</div>
					</div>
					<svg
						v-if="!emailEdit"
						@click="toggleEmailEdit()"
						xmlns="http://www.w3.org/2000/svg"
						class="hover:stroke-blue-600 hover:cursor-pointer flex self-center"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="#000000"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon>
					</svg>
					<svg
						v-else
						@click="cancelEmailEdit()"
						xmlns="http://www.w3.org/2000/svg"
						class="hover:stroke-red-600 hover:cursor-pointer flex self-center"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="#000000"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<line x1="18" y1="6" x2="6" y2="18"></line>
						<line x1="6" y1="6" x2="18" y2="18"></line>
					</svg>
				</div>
			</div>
			<div v-for="user in users" :key="user.id">
				<div class="flex justify-center gap-3 pt-3">
					<p>Account Creation Date:</p>
					<p>{{ user.dateCreated }}</p>
				</div>
				<button
					v-if="!(usernameEdit || emailEdit)"
					@click="deleteWarn(user.id)"
					class="border-2 border-red-600 bg-white hover:bg-red-600 text-red-600 hover:text-white font-bold py-1 px-2 rounded hover:cursor-pointer focus:outline-none focus:shadow-outline transition ease-in-out mx-10 my-16"
				>
					Delete Account
				</button>
			</div>
			<!-- User Update buttons -->
			<div v-if="usernameEdit || emailEdit">
				<div
					class="flex justify-center gap-5 mx-5 my-16"
					v-for="user in users"
					:key="user.id"
				>
					<button
						v-bind:disabled="isButtonDisabled"
						@click="updateUser(user.id)"
						class="border-2 border-blue-600 bg-white hover:bg-blue-600 text-blue-600 hover:text-white font-bold py-1 px-2 rounded hover:cursor-pointer focus:outline-none focus:shadow-outline transition ease-in-out disabled:bg-gray-400 disabled:border-gray-400 disabled:text-gray-500 disabled:cursor-not-allowed"
					>
						Update
					</button>
					<button
						@click="cancelUpdate()"
						class="border-2 border-red-600 bg-white hover:bg-red-600 text-red-600 hover:text-white font-bold py-1 px-2 rounded hover:cursor-pointer focus:outline-none focus:shadow-outline transition ease-in-out"
					>
						Cancel
					</button>
				</div>
			</div>
			<!-- End User Update Buttons -->
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import FloatingInputStandard from '../components/floatinginput/FloatingInputStandard.vue';
import FloatingInputStandardWarning from '../components/floatinginput/FloatingInputStandardWarning.vue';

export default {
	components: {
		FloatingInputStandard,
		FloatingInputStandardWarning,
	},

	name: 'ProfileView',
	data: () => ({
		newUsername: undefined,
		newEmail: undefined,
		usernameEdit: false,
		emailEdit: false,
		promptDelete: false,
		duplicateEmail: false,
		duplicateUsername: false,
		validUsername: true,
		validEmail: true,
		isButtonDisabled: true,
		usernamePattern: /users.users_username_unique/i,
		emailPattern: /users.users_email_unique/i,
		getEmail: '',
		getUsername: '',
		invalidUsernames: [],
		invalidEmails: [],
	}),
	mounted() {
		this.findUsers({ query: {} });
		this.findMessages({ query: {} });
	},
	methods: {
		...mapActions('messages', { findMessages: 'find' }),
		...mapActions('users', { findUsers: 'find' }),
		deleteUser(userId) {
			for (const message of this.messages) {
				message.remove();
			}
			const { User } = this.$FeathersVuex;
			const user = new User({ id: userId });
			user.remove().then(() => {
				//this.$router.go('/');
			});
		},
		updateUser(userId) {
			const { User } = this.$FeathersVuex;
			const user = new User({ id: userId });
			if (this.newEmail == undefined) {
				if (this.newUsername != '' && this.newEmail != '') {
					user.username = this.newUsername;
				}
			} else if (this.newUsername == undefined) {
				if (this.newUsername != '' && this.newEmail != '') {
					user.email = this.newEmail;
				}
			} else {
				user.username = this.newUsername;
				user.email = this.newEmail;
			}

			user
				.save()
				.then(() => {
					this.cancelUpdate();
					this.showAlert();
					this.newUsername = undefined;
					this.newEmail = undefined;
				})
				.catch((error) => {
					if (error.message.match(this.usernamePattern)) {
						this.duplicateUsername = true;
						const firstSplit = error.message.split('- ')[1];
						this.getUsername = firstSplit.split("'")[1];
						this.isButtonDisabled = true;
						this.invalidUsernames.push(this.getUsername);
					} else {
						this.duplicateUsername = false;
						this.invalidUsernames = [];
					}
					if (error.message.match(this.emailPattern)) {
						this.duplicateEmail = true;
						const firstSplit = error.message.split('- ')[1];
						this.getEmail = firstSplit.split("'")[1];
						this.isButtonDisabled = true;
						this.invalidEmails.push(this.getEmail);
					} else {
						this.duplicateEmail = false;
						this.invalidEmails = [];
					}
				});
		},
		toggleUsernameEdit() {
			this.usernameEdit = true;
			this.promptDelete = false;
		},
		toggleEmailEdit() {
			this.emailEdit = true;
			this.promptDelete = false;
		},
		cancelUsernameEdit() {
			this.newUsername = undefined;
			this.usernameEdit = false;
			this.validUsername = true;
		},
		cancelEmailEdit() {
			this.newEmail = undefined;
			this.emailEdit = false;
			this.validEmail = true;
		},
		deletePrompt() {
			this.promptDelete = true;
		},
		cancelDelete() {
			this.promptDelete = false;
		},
		cancelUpdate() {
			this.cancelUsernameEdit();
			this.cancelEmailEdit();
		},
		checkValidation() {
			if (this.invalidUsernames.includes(this.newUsername)) {
				this.duplicateUsername = true;
			} else {
				this.duplicateUsername = false;
			}

			if (this.invalidEmails.includes(this.newEmail)) {
				this.duplicateEmail = true;
			} else {
				this.duplicateEmail = false;
			}

			if (this.duplicateUsername === false && this.duplicateEmail === false) {
				if (this.newUsername !== undefined || this.newEmail !== undefined) {
					if (this.validUsername === true && this.validEmail === true) {
						this.isButtonDisabled = false;
					} else {
						this.isButtonDisabled = true;
					}
				} else {
					this.isButtonDisabled = true;
				}
			} else {
				this.isButtonDisabled = true;
			}
		},
		validateUserRules(value) {
			if (this.usernameEdit == true) {
				if (/^[A-Za-z][0-9a-zA-Z]{3,11}$/i.test(value)) {
					this.validUsername = true;
				} else {
					this.validUsername = false;
				}
			}
		},
		validateEmailRules(value) {
			if (this.emailEdit == true) {
				if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
					this.validEmail = true;
				} else {
					this.validEmail = false;
				}
			}
		},
		showAlert() {
			this.$swal('Success!', 'Your Account has been updated!', 'success');
		},
		deleteWarn(userId) {
			this.$swal({
				title: 'Are you sure you want to delete your account?',
				text: "You won't be able to revert this!",
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, delete my account!',
			}).then((result) => {
				if (result.isConfirmed) {
					this.deleteUser(userId);
					this.$swal({
						title: 'Your account has been deleted.',
						icon: 'success',
						confirmButtonText: 'Go To Login',
					}).then(() => {
						this.$router.go('/');
					});
				}
			});
		},
	},
	computed: {
		...mapGetters('messages', { findMessagesInStore: 'find' }),
		messages() {
			return this.findMessagesInStore({ query: {} }).data;
		},
		...mapGetters('users', { findUsersInStore: 'find' }),
		users() {
			return this.findUsersInStore({ query: {} }).data;
		},
	},
	watch: {
		newUsername(value) {
			this.newUsername = value;
			this.validateUserRules(value);
			this.checkValidation();
		},
		newEmail(value) {
			this.newEmail = value;
			this.validateEmailRules(value);
			this.checkValidation();
		},
	},
};
</script>
