import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				black: '#020202',
				white: '#FDFFFC',
				primary: {
					DEFAULT: '#114B5F',
					hover: '#092934'
				},
				secondary: {
					DEFAULT: '#7F979F',
					hover: '#4F6269'
				},
				tertiary: {
					DEFAULT: '#C9E4E7',
					hover: '#9CCDD3'
				},
				danger: '#880D1E',
				success: '#4FB286',
				warning: '#F6F5AE',
				info: '#CAC4CE'
			}
		}
	},

	plugins: [require('@tailwindcss/typography')]
} as Config;
