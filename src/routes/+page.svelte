<script lang="ts">
	// Imports
	import { incrementIndex, timerState } from '../settings';
	import Timer from '$lib/components/Timer.svelte';
	import People from '$lib/components/People.svelte';
</script>

<main>
	<header>
		<img src="./lobsters_vs_mobsters.svg" alt="Lobsters vs Mobsters" />
		<h1>Mob Timer</h1>
	</header>
	<People
		on:change={() => {
			$timerState = 'stopped';
		}}
	/>
	<Timer />
</main>

<style>
	main {
		width: 100%;
		max-width: 34rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 3rem;
		padding: 4rem 1rem 1rem 1rem;
		box-sizing: border-box;
	}

	img {
		width: 100%;
	}

	header {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-bottom: 2rem;
	}

	h1 {
		margin-top: 0.2rem;
		font-size: 1.4rem;
		font-style: italic;
		font-weight: normal;
	}

	@media only screen and (max-width: 600px) {
		main {
			padding-top: 1rem;
			gap: 2.4rem;
		}

		header {
			margin-bottom: 0.8rem;
		}
	}
</style>
