/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',

	theme: {
		container: {
			center: true,
			padding: '1rem'
		},
		extend: {}
	},

	plugins: []
};

module.exports = config;
