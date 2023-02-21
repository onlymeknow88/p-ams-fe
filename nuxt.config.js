export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode

  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  generate: {
    fallback: true,
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'AMS Dashboard',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // {
      //   rel: 'stylesheet',
      //   href: 'https://cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css',
      // },
      // {
      //   rel: 'stylesheet',
      //   href: 'https://cdn.datatables.net/responsive/2.2.3/css/responsive.dataTables.min.css',
      // },
      {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css',
      },
      {
        rel: 'stylesheet',
        href: '/assets/css/select2.min.css',
      },
      {
        rel: 'stylesheet',
        href: '/assets/css/select2-bootstrap-5-theme.min.css',
      },
      { rel: 'stylesheet', href: '/assets/css/main.css' },
      { rel: 'stylesheet', href: '/assets/css/utilities.css' },
    ],
    script: [
      { src: 'https://code.jquery.com/jquery-3.5.1.js' },
      {
        src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js',
      },
      {
        src: '/assets/js/select2.full.min.js',
      },
      {
        src: '/assets/js/main.js',
      },
      // { src: 'https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js' },
      // {
      //   src: 'https://cdn.datatables.net/responsive/2.2.3/js/dataTables.responsive.min.js',
      // },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // { src: '@/plugins/lightbox.js' },
    { src: '@/plugins/disableconsole.js' },
    { src: '@/plugins/vue_datepickker.js' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    'nuxt-highcharts',
    'nuxt-sweetalert2',
    'bootstrap-vue/nuxt',
    // 'select2'
  ],
  bootstrapVue: {
    bootstrapCSS: false, // Or `css: false`
    bootstrapVueCSS: false, // Or `bvCSS: false`
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'http://p-ams-backend.test/api/',
  },

  router: {
    middleware: ['auth'],
  },

  auth: {
    strategies: {
      local: {
        token: {
          property: 'result.access_token',
          global: true,
          required: true,
          type: 'Bearer',
          maxAge: 60 * 60 * 24 * 30
        },
        user: {
          property: 'result',
          autoFetch: true,
        },
        endpoints: {
          login: { url: '/login', method: 'post' },
          logout: { url: '/logout', method: 'post' },
          user: { url: '/user', method: 'get' },
        },
      },
    },
    watchLoggedIn: true,
    redirect: {
      // login: '/login',
      logout: '/login',
      callback: false,
      home: false,
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    publicPath: '/nuxt/',
  },

}
