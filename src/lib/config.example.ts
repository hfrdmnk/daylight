const config = {
	locactions: [
		{
			title: 'Berne',
			timezone: 'Europe/Zurich',
			markers: [
				[46.94809, 7.44744]
				// add more markers here
			]
		}
		// add more locations here
	]
};

const encodedConfig = encodeURIComponent(JSON.stringify(config));
console.log(encodedConfig);
