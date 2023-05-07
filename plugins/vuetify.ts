import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as labsComponents from "vuetify/labs/components";
import * as directives from "vuetify/directives";
import { LightTheme } from "~/themes/LightTheme";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components: {
      ...components,
      ...labsComponents,
    },
    directives,
    theme: {
      defaultTheme: "LightTheme",
      themes: {
        LightTheme,
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
