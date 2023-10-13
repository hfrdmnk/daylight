<script lang="ts">
	import { onMount } from 'svelte';

	export let data;

	let currentTimeFormatted = '';
	let currentTime: Date;

	function updateTime() {
		const time = new Date();
		const hours = time.getHours();
		const minutes = time.getMinutes();
		const seconds = time.getSeconds();
		currentTimeFormatted = `${hours}:${minutes}:${seconds}`;
		currentTime = time;
	}

	onMount(() => {
		// Call updateTime() every second
		setInterval(updateTime, 1000);
	});
</script>

<div class="min-h-screen flex flex-col">
	<div class="py-8 flex-1 container flex flex-col items-center">
		<h1 class="text-4xl font-bold text-center">Daylight</h1>
		<main class="flex-1 flex items-center flex-wrap gap-8">
			{#each data.locations as location}
				<div class="p-8 flex flex-col gap-8 items-center">
					<h2 class="text-3xl font-bold">{location.title}</h2>
					{currentTimeFormatted}
				</div>
			{/each}
		</main>
	</div>
	<footer class="py-8">
		<div class="container text-center">🐹😸🐠</div>
	</footer>
</div>
