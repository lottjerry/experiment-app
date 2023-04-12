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
				<router-link
					to="/"
					class="border-2 border-blue-600 bg-white hover:bg-blue-600 text-blue-600 hover:text-white font-bold py-1 px-2 w-20 rounded focus:outline-none focus:shadow-outline transition ease-in-out"
					>Login</router-link
				>
				<router-link
					to="/signup"
					class="border-2 border-blue-600 bg-white hover:bg-blue-600 text-blue-600 hover:text-white font-bold py-1 px-2 w-20 rounded focus:outline-none focus:shadow-outline transition ease-in-out"
					>Signup</router-link
				>
			</div>
		</div>
	</div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
