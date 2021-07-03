<template>
  <div>
    <v-app-bar color="header" app>
      <v-app-bar-nav-icon
        color="header_theme_btn"
        @click.stop="$emit('hide')"
      ></v-app-bar-nav-icon>

      <v-toolbar-title class="header_theme_btn--text">
        {{ user.first_name }}</v-toolbar-title
      >

      <v-spacer></v-spacer>

      <div class="theme-mode navbar-nav">
        <v-btn
          name="themeBtn"
          color="header_theme_btn"
          @click="themeMode(!$store.getters.getTheme.isDark)"
          icon
        >
          <v-icon>{{
            $store.getters.getTheme.isDark
              ? "mdi-weather-sunny"
              : "mdi-weather-night"
          }}</v-icon>
        </v-btn>
      </div>
      <v-btn icon>
        <v-icon color="header_theme_btn">mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon color="header_theme_btn">mdi-magnify</v-icon>
      </v-btn>

      <div class="lang">
        <!-- I18N -->
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn fab x-small dark v-bind="attrs" v-on="on">
              <v-img width="0px" :src="$store.getters.getLang.icon"></v-img>
            </v-btn>
          </template>
          <div
            v-for="(item, index) in languages.filter(
              (x) => x.name != $store.getters.getLang.name
            )"
            :key="index"
            style="margin-top: 10px"
          >
            <v-btn
              fab
              x-small
              dark
              v-bind="attrs"
              v-on="on"
              @click="setLang(item)"
            >
              <v-img width="0px" :src="item.icon"></v-img>
            </v-btn>
          </div>
        </v-menu>
      </div>
      <v-menu left bottom offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-avatar v-if="user.image_path" v-bind="attrs" v-on="on">
            <img :src="user.image_path" :alt="user.first_name" />
          </v-avatar>
          <v-avatar v-else v-bind="attrs" v-on="on">
            <span class="white--text headline">{{ user.first_char }}</span>
          </v-avatar>
        </template>
        <v-list>
          <v-list-item @click="() => {}">
            <v-list-item-title
              ><v-icon>mdi-car-shift-pattern</v-icon>&nbsp;{{
                $t("message.tasks")
              }}</v-list-item-title
            >
          </v-list-item>
          <v-list-item @click="() => {}">
            <v-list-item-title
              ><v-icon>mdi-message</v-icon>&nbsp;
              {{ $t("message.messages") }}</v-list-item-title
            >
          </v-list-item>
          <v-list-item
            @click="
              () => {
                resetDialog = true;
              }
            "
          >
            <v-list-item-title
              ><v-icon>mdi-lock-reset</v-icon>&nbsp;
              {{ $t("message.resetPassword") }}</v-list-item-title
            >
          </v-list-item>
          <v-list-item @click="$router.push({ name: 'UserOption' })">
            <v-list-item-title
              ><v-icon>mdi-cog-outline</v-icon>&nbsp;
              {{ $t("message.options") }}</v-list-item-title
            >
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item @click="logout()">
            <v-list-item-title
              ><v-icon>mdi-lock</v-icon>&nbsp;{{ $t("message.logout") }}</v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <reset-password
      :_dialog="resetDialog"
      v-on:dialogClose="
        (value) => {
          resetDialog = value;
        }
      "
    ></reset-password>
  </div>
</template>

<script>
export default {
  components: {
    ResetPassword: () => import("@/views/auth/ResetPassword"),
  },
  data() {
    return {
      user: {},
      resetDialog: false,
      languages: [
        {
          name: "en",
          icon: require("../../assets/vendor/svg/en.svg"),
        },
        {
          name: "de",
          icon: require("../../assets/vendor/svg/de.png"),
        },
        {
          name: "fr",
          icon: require("../../assets/vendor/svg/fr.svg"),
        },
        {
          name: "tr",
          icon: require("../../assets/vendor/svg/tr.svg"),
        },
      ],
    };
  },
  mounted() {
    this.user = this.firstChar(this.$store.getters.currentUser);
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
    firstChar(x) {
      return {
        ...x,
        first_char: x.first_name + "" + x.last_name,
      };
    },
    /** Theme Mode */
    themeMode(status) {
      this.$store.dispatch("changeUserTheme", status);
    },
    setLang(item) {
      this.$store.dispatch("lang", item);
    },
  },
};
</script>

<style scoped>
.lang {
  margin-right: 10px;
}
</style>