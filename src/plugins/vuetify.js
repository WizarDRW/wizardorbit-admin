import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import store from "@/core/services/store"
import themes from "../core/themes"
// import plugin
import { TiptapVuetifyPlugin } from 'tiptap-vuetify'
// don't forget to import CSS styles
import 'tiptap-vuetify/dist/main.css'


// Vuetify Object (as described in the Vuetify 2 documentation)
const vuetify = new Vuetify()

// use Vuetify's plugin
Vue.use(Vuetify)
// use this package's plugin
Vue.use(TiptapVuetifyPlugin, {
  // the next line is important! You need to provide the Vuetify Object to this place.
  vuetify, // same as "vuetify: vuetify"
  // optional, default to 'md' (default vuetify icons before v2.0.0)
  iconsGroup: 'mdi'
})

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: themes.light,
      dark: themes.dark
    },
    dark: store.getters.getTheme.isDark
  }
});