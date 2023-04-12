<template>
	<div>
		<div class="mb-4">
			<div class="relative">
				<div class="relative">
					<input
						:value="value"
						@input="updateValue"
						:type="type"
						id="id"
						class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
					/>
					<label
						for="id"
						class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
						>{{ label }}</label
					>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		label: String,
		value: String,
    type: String,
	},
	methods: {
		updateValue(event) {
			this.$emit('input', event.target.value);
		},
	},
};
</script>

<style lang="scss" scoped></style>
