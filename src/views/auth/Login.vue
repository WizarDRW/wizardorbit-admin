<template>
  <v-app id="inspire">
    <div class="alert">
      <v-alert v-if="error.status" type="error"> {{ error.message }} </v-alert>
    </div>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>{{$t('phrases.admin_panel_login')}}</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    prepend-icon="mdi-account"
                    v-model="user.email"
                    name="login"
                    :label="$t('keywords.email')"
                    type="text"
                    @keypress.enter="login()"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    v-model="user.password"
                    prepend-icon="mdi-lock"
                    name="password"
                    :label="$t('keywords.password')"
                    type="password"
                    @keypress.enter="login()"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="login()" color="primary" :disabled="loading">
                  <v-progress-circular
                    v-if="loading"
                    :width="7"
                    color="white"
                    indeterminate
                  ></v-progress-circular>
                  {{$t('keywords.login')}}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { LOGIN, LOGOUT, CURRENT_USER } from "@/core/services/store/auth.module";
export default {
  name: "Login",
  components: {},
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      loading: false,
      error: {
        status: false,
        message: "",
      },
    };
  },
  methods: {
    login() {
      const email = this.user.email;
      const password = this.user.password;
      this.$store.dispatch(LOGOUT);
      this.loading = true;
      // send login request
      this.$store
        .dispatch(LOGIN, { email, password })
        // go to which page after successfully login
        .then((x) => {
          if (x.data == true) {
            this.$store.dispatch(CURRENT_USER);
            this.$router.push({ path: this.$route.query.returnPath || '/' });
          } else {
            this.error.status = true;
            this.error.message = x.data.message;
            this.loading = false;
            setTimeout(() => {
              this.error.status = false;
            }, 5000);
          }
        });
    },
  },
};
</script>

<style scoped>
.alert {
  position: absolute;
  right: 5px;
  top: 5px;
}
</style>
