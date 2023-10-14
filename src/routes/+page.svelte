<script lang="ts">
	import { onMount } from 'svelte';
	import createGlobe, { type Marker } from 'cobe';

	export let data;
	let locations = data.locations;

	let canvas: HTMLCanvasElement;
	let phi = 0;

	let currentDateTime = new Date();

	const sleepingOptions = {
		start: 22,
		end: 7
	};

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

	function isSleeping(fn: () => string) {
		const time = fn();
		const [hours] = time.split(':');
		const hour = parseInt(hours);

		return hour >= sleepingOptions.start || hour < sleepingOptions.end;
	}

	onMount(() => {
		setInterval(updateDateTime, 1000);

		const locationMarkersLoop = locations.map((location) => {
			if (location.markers.length > 0) {
				const markers = location.markers.map((marker) => {
					const tempMarker = {
						location: [marker[0], marker[1]],
						size: 0.08
					} as Marker;

					return tempMarker;
				});

				return markers;
			} else {
				return [];
			}
		});

		const locationMarkers = locationMarkersLoop.flat();

		const globe = createGlobe(canvas, {
			devicePixelRatio: 1,
			width: 480,
			height: 480,
			phi: 0,
			theta: 0,
			dark: -1,
			diffuse: 0,
			mapSamples: 7500,
			mapBrightness: 2,
			baseColor: [1, 1, 1],
			markerColor: [0.2, 0.8, 0.6],
			glowColor: [1, 1, 1],
			markers: locationMarkers,
			onRender: (state) => {
				state.phi = phi;
				phi += 0.005;
			}
		});
	});
</script>

<div class="min-h-screen flex flex-col relative">
	<div class="fixed inset-0 overflow-hidden">
		<canvas
			bind:this={canvas}
			class="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[480px] h-[480px]"
		/>
	</div>
	<div class="flex-1 container flex flex-col">
		<header class="py-8">
			<h1 class="text-4xl font-bold text-center">Daylight</h1>
		</header>
		<main class="flex-1 flex items-center justify-around flex-wrap gap-2 py-8">
			{#each locations as location}
				{@const sleeping = isSleeping(() =>
					getTimeInfo(currentDateTime, location.timezone, 'time')
				)}
				<div class:dark={sleeping}>
					<div
						class="px-16 pt-20 pb-8 flex flex-col items-center border border-gray-200 rounded-3xl shadow-lg bg-gray-50/20 backdrop-blur-sm relative dark:bg-gray-950/60 dark:border-gray-950"
					>
						<div
							class="absolute top-2 right-2 p-2 bg-gray-400/10 dark:bg-gray-950/10 rounded-full h-12 w-12 flex items-center justify-center text-xl"
						>
							{sleeping ? '🌙' : '☀️'}
						</div>
						<h3 class="text-5xl tabular-nums mb-2">
							{getTimeInfo(currentDateTime, location.timezone, 'time')}
						</h3>
						<h3 class="font-medium tabular-nums text-2xl">
							{getTimeInfo(currentDateTime, location.timezone, 'date')}
						</h3>

						<h2 class="font-normal text-gray-500 text-xl mt-12">{location.title}</h2>
					</div>
				</div>
			{/each}
		</main>
	</div>
	<footer class="py-8">
		<div class="container text-center">🐹 😸 🐠</div>
	</footer>
</div>
