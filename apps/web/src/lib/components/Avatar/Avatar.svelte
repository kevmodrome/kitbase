<script lang="ts">
	export let url: string;
	export let name: string;
	export let large: boolean = false;
	export let small: boolean = false;
</script>

<img src={url} class:large class:small alt="Image of {name}" />

<style lang="postcss">
	img {
		--_avatar-size: var(--avatar-size, 50px);
		border-radius: var(--radius-round);
		aspect-ratio: var(--ratio-square);
		width: var(--_avatar-size);
		height: var(--_avatar-size);
	}
	.large {
		--avatar-size: 70px;
	}

	.small {
		--avatar-size: 30px;
	}
</style>
