<template>
	<div>
		<h1 class="text-3xl font-bold text-blue-600">SIGN UP</h1>
		<div class="flex justify-center">
			<div class="w-full max-w-xs">
				<form
					@submit.prevent="signUp"
					class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
				>
					<!-- USERNAME BEGIN -->
					<div v-if="!duplicateUsername">
						<FloatingInputOutlined
							v-model="user.username"
							label="Username"
							type="text"
						/>
						<div v-if="!validUsername" class="flex gap-2 justify-center mb-4">
							<p class="text-orange-600">Invalid Username.</p>
							<div v-html="svg.warn"></div>
						</div>
					</div>
					<div v-else>
						<FloatingInputOutlinedWarning
							v-model="user.username"
							label="Username"
							type="text"
						/>
						<div class="flex gap-2 justify-center mb-4">
							<div v-html="svg.error"></div>
							<p class="text-red-600">Username already exists.</p>
						</div>
						<div v-if="!validUsername" class="flex gap-2 justify-center mb-4">
							<p class="text-orange-600">Invalid Username.</p>
							<div v-html="svg.warn"></div>
						</div>
					</div>
					<!-- USERNAME END -->

					<!-- EMAIL BEGIN -->
					<div v-if="!duplicateEmail">
						<FloatingInputOutlined
							v-model="user.email"
							label="Email"
							type="text"
						/>
						<div v-if="!validEmail" class="flex gap-2 justify-center mb-4">
							<p class="text-orange-600">Invalid Email.</p>
							<div v-html="svg.warn"></div>
						</div>
					</div>
					<div v-else>
						<FloatingInputOutlinedWarning
							v-model="user.email"
							label="Email"
							type="text"
						/>
						<div class="flex gap-2 justify-center mb-4">
						<div v-html="svg.error"></div>
							<p class="text-red-600">Email already exists.</p>
						</div>
						<div v-if="!validEmail" class="flex gap-2 justify-center mb-4">
							<p class="text-orange-600">Invalid Email.</p>
							<div v-html="svg.warn"></div>
						</div>
					</div>
					<!-- EMAIL END -->

					<!-- 	PASSWORD BEGIN -->
					<FloatingInputOutlined
						v-model="user.password"
						label="Password"
						type="password"
					/>
					<div v-if="!validPassword" class="flex gap-2 justify-center mb-4">
						<p class="text-orange-600">
							Password has to be 8 or more characters long.
						</p>
					</div>
					<!-- PASSWORD END -->
					
					<div class="flex-col items-center">
						<button
							v-bind:disabled="isButtonDisabled"
							class="border-2 border-blue-600 bg-white hover:bg-blue-600 text-blue-600 hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition ease-in-out disabled:bg-gray-400 disabled:border-gray-400 disabled:text-gray-500 disabled:cursor-not-allowed"
							type="submit"
						>
							Sign up
						</button>
						<div for="terms" class="mt-5 text-sm font-medium text-gray-900">
							Already have an account?
							<router-link
								to="/"
								class="text-blue-600 hover:underline hover:cursor-pointer"
								>Log in</router-link
							>
						</div>
					</div>
				</form>
				<p class="text-center text-gray-500 text-xs">
					&copy;2023 Feathers Playground
				</p>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex';
import FloatingInputOutlined from '../components/floatinginput/FloatingInputOutlined.vue';
import FloatingInputOutlinedWarning from '../components/floatinginput/FloatingInputOutlinedWarning.vue';

export default {
	components: {
		FloatingInputOutlined,
		FloatingInputOutlinedWarning,
	},
	name: 'SignupView',
	data() {
		return {
			svg: {
				warn: `<svg
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
							</svg>`,
				error: `		<svg
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
							</svg>`,
			},
			user: {
				username: undefined,
				email: undefined,
				password: undefined,
			},
			duplicateEmail: false,
			duplicateUsername: false,
			validUsername: true,
			validEmail: true,
			validPassword: true,
			isButtonDisabled: true,
			usernamePattern: /users.users_username_unique/i,
			emailPattern: /users.users_email_unique/i,
			getEmail: '',
			getUsername: 'undefined',
			invalidUsernames: [],
			invalidEmails: [],
		};
	},
	methods: {
		...mapActions('auth', ['authenticate']),
		login() {
			this.authenticate({
				strategy: 'local',
				...this.user, // use spread operator to get user credentials
			}).then(() => {
				this.$router.push('./messages');
			});
		},
		signUp() {
			const { User } = this.$FeathersVuex;
			const user = new User(this.user);
			user
				.save()
				.then(() => {
					this.showAlert();
					this.login();
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
		checkValidation() {
			if (this.invalidUsernames.includes(this.user.username)) {
				this.duplicateUsername = true;
			} else {
				this.duplicateUsername = false;
			}

			if (this.invalidEmails.includes(this.user.email)) {
				this.duplicateEmail = true;
			} else {
				this.duplicateEmail = false;
			}

			if (this.duplicateUsername === false && this.duplicateEmail === false) {
				if (
					this.user.username !== undefined &&
					this.user.email !== undefined &&
					this.user.password !== undefined
				) {
					if (
						this.validUsername === true &&
						this.validEmail === true &&
						this.validPassword === true
					) {
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
			if (/^[A-Za-z][0-9a-zA-Z]{3,11}$/i.test(value)) {
				this.validUsername = true;
			} else {
				this.validUsername = false;
			}
		},
		validateEmailRules(value) {
			if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
				this.validEmail = true;
			} else {
				this.validEmail = false;
			}
		},
		validatePasswordRules(value) {
			if (/^.{8,}$/.test(value)) {
				this.validPassword = true;
			} else {
				this.validPassword = false;
			}
		},
		showAlert() {
			this.$swal('Success!', 'Your Account has been created!', 'success');
		},
	},
	watch: {
		'user.username'(value) {
			this.user.username = value;
			this.validateUserRules(value);
			this.checkValidation();
		},
		'user.email'(value) {
			this.user.email = value;
			this.validateEmailRules(value);
			this.checkValidation();
		},
		'user.password'(value) {
			this.user.password = value;
			this.validatePasswordRules(value);
			this.checkValidation();
		},
	},
};
</script>
