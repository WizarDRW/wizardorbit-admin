<template>
  <div>
    <v-app-bar color="accent-4" dense dark app>
      <v-app-bar-nav-icon @click.stop="$emit('hide')"></v-app-bar-nav-icon>

      <v-toolbar-title> {{ user.first_name }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

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
              ><v-icon>mdi-car-shift-pattern</v-icon
              >&nbsp;Görevler</v-list-item-title
            >
          </v-list-item>
          <v-list-item @click="() => {}">
            <v-list-item-title
              ><v-icon>mdi-message</v-icon>&nbsp; Mesajlar</v-list-item-title
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
              ><v-icon>mdi-lock-reset</v-icon>&nbsp; Şifre
              Değiştir</v-list-item-title
            >
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item @click="logout()">
            <v-list-item-title
              ><v-icon>mdi-lock</v-icon>&nbsp;Çıkış</v-list-item-title
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
    };
  },
  mounted() {
    this.user = this.firstChar(this.$store.getters.currentUser);
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
    },
    firstChar(x) {
      return {
        ...x,
        first_char: x.first_name + "" + x.last_name,
      };
    },
  },
};
</script>

<style scoped>
</style>