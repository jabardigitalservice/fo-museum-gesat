import colors from 'vuetify/es5/util/colors'

export default {

  publicRuntimeConfig: {
    recaptcha: {
      /* reCAPTCHA options */
      siteKey: process.env.GOOGLE_RECAPTCHA_KEY,
      version: 2
    }
  },


  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Reservasi Kunjungan Jabar Command Center',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: `Platform Reservasi Kunjungan Jabar Command Center.
        Anda dapat mengajukan permohonan kunjungan dengan mengisi data diri pada Form Permohonan Kunjungan,
        atau mengecek status permohonan Anda pada halaman Cek Status Permohonan.`
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/logojcc.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/main.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/validation-rules',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/toast',
    '@nuxtjs/recaptcha',
    '@nuxtjs/sentry'
  ],

  sentry: {
    dsn: process.env.SENTRY_LARAVEL_DSN, // project's DSN here
    config: {}, // Additional config
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: process.env.API_URL
  },

  env: {
    phoneNumber: process.env.PHONE_NUMBER,
    messages: process.env.MESSAGES,
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {
          primary: '#1682B6',
          secondary: '#16B65C',
          success: '#16B65C',
          warning: '#ECA413',
          danger: '#E5501A',
          darkgray: '#333333'
        },
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }

}
