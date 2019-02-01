<template>
	<p>{{ hello }}</p>
</template>

<script>
    export default {
        data() {
            return {
                hello: 'Hello World!'
            }
        }
    }
</script>

<style scoped>
	p {
		color: blue;
	}
</style>