<script lang="ts">
	import Input from '$lib/components/form/Input.svelte';
	import Button from '$lib/components/Button.svelte';
	import { Avatar } from '$lib/components/Avatar';
	import { notifications } from '$lib/stores/notifications';
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';
	import { update } from './submit';
	export let data: PageData;
	export let form: ActionData;
	$: form?.success && notifications.success('Profile updated');
	let loading = false;
</script>

<main>
	<h1>Manage your account</h1>
	<div class="sections">
		<section class="card">
			<div class="heading">
				<h2>Your Profile</h2>
				<Avatar url={data.user?.profile.avatar} name={data.user?.profile.name} />
			</div>
			<form
				use:enhance={update}
				on:loading={() => (loading = true)}
				on:finish={() => (loading = false)}
				action="?/update"
				method="POST"
			>
				<Input id="email" label="E-mail" type="email" value={data?.user?.email} disabled />
				<Input
					id="name"
					label="Name"
					type="text"
					value={data?.user?.profile?.name}
					placeholder="Please enter a name"
					disabled={loading}
				/>
				<div class="right"><Button type="success" disabled={loading}>Update profile</Button></div>
				{#if form?.success}
					Success!
				{/if}
			</form>
		</section>
		<section class="card">
			<h2>Billing & Subscription</h2>
			<p><strong>Your plan:</strong> Starter Yearly</p>
			<p><strong>Next invoice:</strong> $150 on October 5, 2023</p>
		</section>
	</div>
</main>

<style>
	main {
		padding: 0 var(--size-3);
	}
	.sections {
		padding: 0;
		margin: 0;
		display: grid;
		gap: var(--size-fluid-2);
		grid-template-columns: repeat(auto-fit, minmax(min(400px, 100%), 1fr));
		max-inline-size: 1100px;
	}
	.card {
		box-shadow: var(--shadow-1);
		background: var(--gray-8);
		border-radius: var(--radius-2);
		padding: var(--size-2) var(--size-3);
	}

	.heading {
		display: flex;
		place-content: space-between;
	}

	form {
		display: grid;
		margin: var(--size-3) 0;
		gap: var(--size-3);
	}

	.right {
		display: grid;
		width: 100%;
		place-content: end;
	}
</style>
