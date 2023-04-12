<template>
	<div>
		<div class="flex justify-center">
			<div class="w-full max-w-xl">
				<form
					@submit.prevent="createMessage"
					class="bg-white shadow-md rounded px-8 pt-4 pb-4 mb-4"
				>
					<div v-if="validMessage">
						<FloatingInputOutlined
							v-model="message.messageBody"
							label="New Message"
							type="text"
						/>
					</div>
					<div v-else>
						<FloatingInputOutlined
							v-model="message.messageBody"
							label="New Message"
							type="text"
						/>
					</div>
					<div v-if="!validMessage" class="flex gap-1 justify-center mb-5">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="stroke-orange-400"
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
						<p class="text-orange-600">Message can't be empty.</p>
					</div>
					<div v-if="!validMessage2" class="flex gap-1 justify-center mb-5">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="stroke-orange-400"
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
						<p class="text-orange-600">Message can only contain 100 characters.</p>
					</div>
					<div class="flex flex-col items-center gap-5">
						<button
							v-bind:disabled="isButtonDisabled"
							class="border-2 border-blue-600 bg-white hover:bg-blue-600 text-blue-600 hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition ease-in-out disabled:bg-gray-400 disabled:border-gray-400 disabled:text-gray-500 disabled:cursor-not-allowed"
							type="submit"
						>
							Create Message
						</button>
					</div>
				</form>
			</div>
		</div>
		<div class="border-2 border-black my-2 mx-40 rounded-lg overflow-auto h-96">
			<Message />
		</div>
		<button
			v-if="this.messages.length"
			@click="deleteWarn()"
			class="border-2 border-red-600 bg-white hover:bg-red-600 text-red-600 hover:text-white font-bold py-1 px-8 rounded focus:outline-none focus:shadow-outline transition ease-in-out"
		>
			Delete All
		</button>
		<button
			v-else
			class="border-2 border-gray-400 bg-gray-400 hover:cursor-not-allowed text-gray-500 font-bold py-1 px-8 rounded"
		>
			Delete All
		</button>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import FloatingInputOutlined from '../components/floatinginput/FloatingInputOutlined.vue';
import Message from '../components/Message.vue';

export default {
	components: {
		FloatingInputOutlined,
		Message,
	},
	name: 'MessagesView',
	data: () => ({
		message: {
			messageBody: '',
		},
		validMessage: true,
		validMessage2: true,
		isButtonDisabled: true,
	}),
	mounted() {
		this.findMessages({ query: {} });
		this.findUsers({ query: {} });
	},
	methods: {
		...mapActions('messages', { findMessages: 'find' }),
		...mapActions('users', { findUsers: 'find' }),
		createMessage() {
			const { Message } = this.$FeathersVuex;
			const message = new Message(this.message);
			message.save().then(() => {
				message.messageBody = undefined;
			});
		},
		deleteAllMessages() {
			for (const message of this.messages) {
				message.remove();
			}
		},

		validateMessageRules(value) {
			if (/^.+/.test(value)) {
				this.validMessage = true;
			} else {
				this.validMessage = false;
			}
				if (/^.{0,100}$/.test(value)) {
				this.validMessage2 = true;
			} else {
				this.validMessage2 = false;
			}
		},

		checkValidation() {
			if (this.validMessage2 === true && this.validMessage === true && this.message.messageBody != undefined) {
				this.isButtonDisabled = false;
			} else {
				this.isButtonDisabled = true;
			}
		},

		deleteWarn() {
			this.$swal({
				title: 'Are you sure?',
				text: "You won't be able to revert this!",
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, delete all messages!',
			}).then((result) => {
				if (result.isConfirmed) {
					this.deleteAllMessages();
					this.$swal('Deleted!', 'Your messages has been deleted.', 'success');
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
		'message.messageBody'(value) {
			this.message.messageBody = value;
			this.validateMessageRules(value);
			this.checkValidation();
		},
	},
};
</script>
