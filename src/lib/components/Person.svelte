<script lang="ts">
	// Imports
	import { people, currentIndex, timerState } from '../../settings';
	import type { Person } from '../../types';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	// Props
	export let person: Person;
	export let index: number;

	function deletePerson(event: Event) {
		event.stopPropagation();
		if (active || $people.length - 1 == $currentIndex) {
			$currentIndex = $currentIndex == 0 ? 0 : $currentIndex - 1;
			dispatch('change');
		}
		$people.splice(index, 1);
		$people = $people;
	}

	function selectPerson() {
		if (!active) {
			$currentIndex = index;
			dispatch('change');
		}
	}

	$: active = $currentIndex == index;
</script>

<button
	class={active ? 'active wrapper' : 'wrapper'}
	on:click={selectPerson}
	style="--color: {person.color}"
>
	<div class={$timerState == 'running' ? 'indicator running' : 'indicator'} />
	<div class="icon">
		<img src="./images/{person.icon}.svg" alt={person.icon} />
		<button on:click={deletePerson} class="delete">
			<span class="material-symbols-outlined"> delete </span>
		</button>
	</div>
	<div class="name">
		{person.name}
	</div>
</button>

<style>
	.indicator {
		width: 0.6rem;
		height: 0.6rem;
		border-radius: 50%;
		z-index: 3;
		position: absolute;
		top: -1rem;
		background: var(--color);
		display: none;
		animation: none;
	}

	.indicator.running {
		animation: bounce 1s ease-in-out infinite;
	}

	@keyframes bounce {
		0% {
			transform: translateY(0);
		}

		50% {
			transform: translateY(-0.6rem);
		}

		100% {
			transform: translateY(0);
		}
	}

	.active .indicator {
		display: block;
	}

	.icon {
		width: 4rem;
		height: 4rem;
		border-radius: 50%;
		position: relative;
		box-shadow: 0 0 0.4rem rgba(0, 0, 0, 0.8);
		background: var(--color);
	}

	img {
		position: absolute;
		width: 100%;
		left: 0;
		top: 0;
	}

	.delete {
		position: absolute;
		padding: 0;
		bottom: -0.4rem;
		right: -0.4rem;
		border-radius: 50%;
		width: 1.6rem;
		height: 1.6rem;
		display: flex;
		background: rgb(40, 40, 40);
		align-items: center;
		justify-content: center;
		box-shadow: 0 0 0.4rem rgba(0, 0, 0, 0.4);
		z-index: 2;
		border: 1px solid var(--color);
	}

	.delete span {
		font-size: 1rem;
		color: var(--color);
	}

	.wrapper {
		background: none;
		border: none;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.4rem;
		position: relative;
	}

	.wrapper:hover > .icon {
		opacity: 0.8;
	}

	.delete:hover {
		transform: scale(1.1);
	}

	.name {
		font-size: 0.8rem;
		color: rgb(230, 230, 230);
	}

	@media only screen and (max-width: 34rem) {
		.icon {
			width: 3rem;
			height: 3rem;
		}

		.delete {
			height: 1.4rem;
			width: 1.4rem;
		}

		.indicator {
			width: 0.5rem;
			height: 0.5rem;
		}
	}
</style>
