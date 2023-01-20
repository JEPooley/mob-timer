<script lang="ts">
	// Imports
	import { duration } from '../../settings';
	import { people, currentIndex, timerState, incrementIndex } from '../../settings';

	// Init
	let interval: NodeJS.Timer;
	let time = $duration * 60 * 1000;
	$: person =
		$people.length > 0
			? $people[$currentIndex]
			: { name: 'Jane', color: 'white', colorCompliment: 'white', icon: 'hat' };

	function asTwoDigits(value: number) {
		return value.toLocaleString('en-EN', {
			minimumIntegerDigits: 2,
			useGrouping: false
		});
	}

	function incrementDuration() {
		$duration = $duration + 1;
	}

	function decrementDuration() {
		if ($duration > 1) {
			$duration = $duration - 1;
		}
	}

	function timeup() {
		incrementIndex();
		$timerState = 'stopped';
	}

	function minutes(time: number) {
		const value = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
		return asTwoDigits(value);
	}

	function seconds(time: number) {
		const value = Math.floor((time % (1000 * 60)) / 1000);
		return asTwoDigits(value);
	}

	function start() {
		let targetTime = new Date(new Date().getTime() + time);
		interval = setInterval(() => {
			const now = new Date().getTime();
			time = targetTime.valueOf() - now.valueOf();

			if (time <= 0) {
				time = 0;
				clearInterval(interval);
				timeup();
			}
		}, 1000);
	}

	function stop() {
		clearInterval(interval);
		time = $duration * 60 * 1000;
	}

	function pause() {
		clearInterval(interval);
	}

	$: switch ($timerState) {
		case 'running':
			start();
			break;
		case 'stopped':
			stop();
			break;
		case 'paused':
			pause();
			break;
	}

	$: if ($duration) {
		stop();
		$timerState = 'stopped';
	}

	function addClickedClass(event: Event) {
		const element = event.currentTarget as HTMLElement;
		element.classList.remove('clicked');
		element.offsetWidth;
		element.classList.add('clicked');
	}
</script>

<section
	class={$timerState == 'running' ? 'running' : ''}
	style="--color: {person.color}; --compliment: {person.colorCompliment}"
>
	<canvas class="background" id="granim-canvas" />
	<div class="timer">
		<div class="time-controls">
			<button class="arrow" id="increment-duration" on:click={incrementDuration}
				><span class="material-symbols-outlined"> expand_less </span></button
			>
			<button class="arrow" id="decrement-duration" on:click={decrementDuration}
				><span class="material-symbols-outlined"> expand_more </span></button
			>
		</div>

		<div class="time">
			{minutes(time)}:{seconds(time)}
		</div>

		<div class="play-controls">
			<button
				on:click={(event) => {
					$timerState = 'stopped';
					addClickedClass(event);
				}}><span class="material-symbols-outlined"> stop_circle </span></button
			><button
				on:click={(event) => {
					$timerState = $timerState == 'running' ? 'paused' : 'running';
					addClickedClass(event);
				}}
			>
				{#if $timerState != 'running'}
					<span class="material-symbols-outlined"> play_circle </span>
				{:else}
					<span class="material-symbols-outlined"> pause_circle </span>
				{/if}
			</button>
		</div>
	</div>
</section>

<style>
	section {
		position: relative;
		width: 100%;
		padding-bottom: 40%;
		margin-bottom: 6rem;
		margin-top: 1rem;
	}

	.timer {
		width: calc(100% - 1.6rem);
		height: calc(100% - 1.6rem);
		background: rgb(40, 40, 40);
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		padding: 1.2rem 1rem;
		color: rgb(40, 40, 40);
		color: var(--color);
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		box-shadow: 0 0 1rem rgba(0, 0, 0, 0.8);
		border-radius: 1rem;
	}

	.background {
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, var(--color) 0%, var(--compliment) 100%);
		box-shadow: 0 0 1rem rgba(0, 0, 0, 0.8);
		border-radius: 1.6rem;
		position: absolute;
	}

	.time-controls {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.play-controls {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
		padding-left: 1.4rem;
	}

	.play-controls button span {
		color: var(--compliment);
		font-size: 4rem;
	}

	.play-controls button {
		padding: 0;
		display: flex;
		position: relative;
		border-radius: 50%;
	}

	.time {
		font-size: 6rem;
		font-family: 'Roboto Mono', monospace;
		margin-bottom: 1rem;
	}

	.arrow {
		border-radius: 50%;
		padding: 0;
	}

	.arrow span {
		font-size: 4rem;
		display: flex;
		color: var(--color);
	}

	button:hover {
		opacity: 0.8;
	}

	@keyframes flash {
		0% {
			background: rgba(255, 255, 255, 0.1);
		}

		100% {
			background: rgba(255, 255, 255, 0);
		}
	}

	:global(.clicked) {
		background: rgba(255, 255, 255, 0);
		animation: flash 1s ease-out;
		animation-iteration-count: 1;
	}

	@media only screen and (max-width: 34rem) {
		.timer {
			border-width: 0.6rem;
			width: calc(100% - 1.4rem);
			height: calc(100% - 1.4rem);
			margin-bottom: 0;
			border-radius: 0.8rem;
		}

        .background {
			border-radius: 1rem;
		}

		.time {
			margin-bottom: 0.4rem;
			font-size: 16vmin;
		}

		.play-controls {
			padding-left: 0.4rem;
			gap: 0.4rem;
		}

		.arrow span {
			font-size: 10vmin;
		}

		.play-controls button span {
			font-size: 12vmin;
		}
	}

	@media only screen and (max-width: 375px) {
		section {
			padding-bottom: 45%;
		}
		.timer {
			width: calc(100% - 1rem);
			height: calc(100% - 1rem);
			border-radius: 0.6rem;
		}
		.background {
			border-radius: 0.8rem;
		}
		.time {
			font-size: 12vmin;
		}
		.play-controls button span {
			font-size: 12vmin;
		}
		.play-controls {
			gap: 0.2rem;
		}
	}
</style>
