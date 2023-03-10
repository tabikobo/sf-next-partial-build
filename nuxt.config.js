export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "sf-next-partial-build-dev",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  generate: {
    cache: {
      ignore: [
        ".nuxt", // buildDir
        "static", // dir.static
        "dist", // generate.dir
        "out",
        "infra",
        "node_modules",
        "README.md",
      ],
    },
    routes() {
      const rIdx = process.argv.indexOf("-r");
      if (rIdx > -1) {
        return JSON.parse(process.argv[rIdx + 1]);
      }

      // build full
      const codes = [
        "OITEK9VFR-SGC-YE",
        "TSINSQ35AP-YOK-FM4",
        "THNHA6-TRP-DOV-Y-9",
      ];

      return codes.map((code) => ({
        route: `/tour/${code}`,
        payload: {
          isOff: true,
        },
      }));
    },
  },
};
