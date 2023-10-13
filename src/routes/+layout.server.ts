import type { URLConfig } from '$lib/config.example';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ request }) => {
	const searchParams = new URLSearchParams(request.url.split('?')[1]);
	const config = searchParams.get('config');
	let decodedConfig: URLConfig | undefined;
	let locations: URLConfig['locations'] | undefined;

	try {
		decodedConfig = config ? JSON.parse(decodeURIComponent(config)) : undefined;
		locations = decodedConfig?.locations || undefined;
	} catch (e) {
		throw error(400, 'Invalid config object');
	}

	if (!locations || !locations.length) {
		throw error(400, 'No locations provided');
	}

	return {
		locations
	};
}) satisfies LayoutServerLoad;
