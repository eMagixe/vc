// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ['@nuxt/eslint', '@nuxt/ui'],

	devtools: {
		enabled: false
	},

	css: ['~/assets/css/main.css'],

	nitro: {
		experimental: {
			websocket: true
		}
	},

	compatibilityDate: '2026-06-30',

	eslint: {
		config: {
			stylistic: {
				commaDangle: 'never',
				braceStyle: '1tbs'
			}
		}
	}
})
