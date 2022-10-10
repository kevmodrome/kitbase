<script>
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';
	import { notifications } from '../stores/notifications.ts';

	export let themes = {
		danger: 'var(--red-9)',
		success: 'var(--green-7)',
		warning: 'var(--yellow-6)',
		info: '#5bc0de',
		default: '#aaaaaa'
	};
</script>

<div class="notifications">
	{#each $notifications as notification (notification.id)}
		<div
			animate:flip
			class="toast"
			style="background: {themes[notification.type]};"
			transition:fly={{ y: 30 }}
		>
			<div class="content">{notification.message}</div>
			{#if notification.icon}<i class={notification.icon} />{/if}
		</div>
	{/each}
</div>

<style>
	.notifications {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 10px;
		margin: 0 auto;
		padding: 0;
		z-index: 9999;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		pointer-events: none;
	}

	.toast {
		flex: 0 0 auto;
		margin-bottom: 10px;
		border-radius: var(--radius-2);
	}

	.content {
		padding: 10px;
		display: block;
		color: white;
		font-weight: 500;
	}
</style>
