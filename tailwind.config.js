/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./**/*.{html,js}'],
	purge: ['./src/**/*.{html,js}', './src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {},
	},
	plugins: [],
}
