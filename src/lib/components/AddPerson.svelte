<script lang="ts">
	// Imports
	import { people } from '../../settings';
	import { randomPerson } from '$lib/colors';
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';

	const dispatch = createEventDispatcher();

	function addPerson() {
		const nameInput = document.getElementById('input-name') as HTMLInputElement;
		if (nameInput.value) {
			const person = randomPerson(nameInput.value);
			$people.push(person);
			$people = $people;
			nameInput.value = '';
		}
	}

	function focus(element: HTMLElement) {
		element.focus();
	}
</script>

<section transition:fade>
	<button
		on:click={() => {
			dispatch('close');
		}}><span class="material-symbols-outlined"> close </span></button
	>
	<form on:submit|preventDefault={addPerson} class="add-person">
		<input type="text" name="input-name" id="input-name" placeholder="Nickname" use:focus />
		<button type="submit">Add</button>
	</form>
</section>

<style>
	section {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 1rem;
	}

	input {
		margin: 0;
		height: 100%;
		width: 100%;
		box-sizing: border-box;
		border-radius: 0.4rem 0 0 0.4rem;
		border: 0.2rem solid rgb(60, 60, 60);
		z-index: 2;
		font-size: 0.8rem;
		padding-left: 1rem;
		background: rgb(40, 40, 40);
		color: rgb(230, 230, 230);
	}

	input:is(:focus, :focus-within) {
		outline: none;
	}

	form:is(:focus, :focus-within) {
		outline: none;
		box-shadow: 0 0 0 0.1rem rgb(230, 230, 230);
	}

	button {
		background: rgb(60, 60, 60);
		border: 2px solid rgb(60, 60, 60);
		width: 5rem;
		height: 3rem;
		margin: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 0 0.4rem 0.4rem 0;
		box-shadow: 0 0 0.4rem rgba(0, 0, 0, 0.2);
	}

	button:hover {
		opacity: 0.8;
	}

	span {
		font-size: 2rem;
	}

	form {
		display: flex;
		align-items: center;
		height: 3rem;
		width: 75%;
		border-radius: 0.4rem;
	}

	section > button {
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
	}
</style>
