<script lang="ts">
	export let url: string;
	export let name: string;
	export let large: boolean = false;
	export let small: boolean = false;
</script>

<img src={url} class:large class:small alt="Image of {name}" />

<style lang="postcss">
	img {
		vertical-align: middle;
		border-radius: 50%;
		width: 50px;
		height: 50px;
	}
	.large {
		width: 70px;
		height: 70px;
	}

	.small {
		width: 30px;
		height: 30px;
	}
</style>
