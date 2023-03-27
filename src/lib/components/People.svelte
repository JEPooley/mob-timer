<script lag="ts">
	// Imports
	import Person from '$lib/components/Person.svelte';
	import AddPerson from './AddPerson.svelte';
	import { people } from '../../settings';

	let addPersonVisible = false;
	$: noPeople = !$people.length;
</script>

<section class="people">
	{#each $people as person, i}
		<Person {person} index={i} on:change />
	{/each}
	<button
		on:click={() => {
			addPersonVisible = true;
		}}
		disabled={addPersonVisible}
		class:empty={noPeople && !addPersonVisible}
		><span class="material-symbols-outlined"> add </span></button
	>
</section>

{#if addPersonVisible}
	<AddPerson
		on:close={() => {
			addPersonVisible = false;
		}}
	/>
{/if}

<style>
	section {
		width: 100%;
		margin-bottom: -1rem;
	}

	.people {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
		gap: 1.4rem;
		position: relative;
	}

	button {
		background: rgb(60, 60, 60);
		border: 2px solid rgb(60, 60, 60);
		width: 2.6rem;
		height: 2.6rem;
		margin: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		box-shadow: 0 0 0.4rem rgba(0, 0, 0, 0.2);
		margin-bottom: 1.2rem;
	}

	button:hover {
		opacity: 0.8;
	}

	button:disabled {
		display: none;
	}

	span {
		font-size: 2rem;
	}

	.empty {
		box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);
		transform: scale(1);
		animation: pulse 2s infinite;
	}

	@keyframes pulse {
		0% {
			transform: scale(0.9);
			box-shadow: 0 0 0 0 rgba(60, 60, 60, 0.7);
		}

		70% {
			transform: scale(1);
			box-shadow: 0 0 0 2rem rgba(60, 60, 60, 0);
		}

		100% {
			transform: scale(0.9);
			box-shadow: 0 0 0 0 rgba(60, 60, 60, 0);
		}
	}
</style>
