<script lang="ts">
	import { onMount } from 'svelte';

	export let data;
	let locations = data.locations;
	let currentDateTime = new Date();

	type Location = (typeof locations)[0];

	function updateDateTime() {
		currentDateTime = new Date();
	}

	function getTimeInfo(dateTime: Date, timezone: string, property: 'date' | 'time') {
		const formatter = new Intl.DateTimeFormat('de-CH', {
			timeZone: timezone,
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: 'numeric',
			minute: 'numeric',
			second: 'numeric'
		});

		const formattedDateTime = formatter.format(dateTime);
		const [date, time] = formattedDateTime.split(', ');

		if (property === 'date') {
			return date;
		} else {
			return time;
		}
	}

	onMount(() => {
		setInterval(updateDateTime, 1000);
	});
</script>

<div class="min-h-screen flex flex-col">
	<div class="py-8 flex-1 container flex flex-col items-center">
		<h1 class="text-4xl font-bold text-center">Daylight</h1>
		<main class="flex-1 flex items-center flex-wrap gap-8">
			{#each locations as location}
				<div
					class="p-16 pb-8 flex flex-col items-center border border-gray-200 rounded-md shadow-md bg-white/50 backdrop-blur-lg"
				>
					<h3 class="text-4xl tabular-nums mb-2">
						{getTimeInfo(currentDateTime, location.timezone, 'time')}
					</h3>
					<h3 class="font-normal tabular-nums text-2xl">
						{getTimeInfo(currentDateTime, location.timezone, 'date')}
					</h3>
					<h2 class="font-normal text-gray-500 text-xl mt-16">{location.title}</h2>
				</div>
			{/each}
		</main>
	</div>
	<footer class="py-8">
		<div class="container text-center">🐹 😸 🐠</div>
	</footer>
</div>
