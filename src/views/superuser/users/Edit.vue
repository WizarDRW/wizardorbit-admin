<template>
  <v-container>
    <sub-header>
      <template #buttons>
        <v-btn
          :disabled="loading"
          icon
          color="red"
          @click="$router.push({ name: 'Users' })"
        >
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-btn :loading="loading" icon color="green" @click="handleSave()">
          <v-icon>mdi-content-save-outline</v-icon>
        </v-btn>
      </template>
    </sub-header>
    <br />
    <v-row no-gutters>
      <v-col cols="3" class="text-center">
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-width="200"
          offset-x
        >
          <template v-slot:activator="{ on, attrs }">
            <v-hover v-slot="{ hover }">
              <v-avatar
                width="200px"
                height="200px"
                :elevation="hover ? 12 : 2"
                :class="{ 'on-hover': hover }"
              >
                <v-img
                  :src="
                    changeImage
                      ? changeImage
                      : `https://i4.hurimg.com/i/hurriyet/75/0x0/600965400f25443f0406f3ab.jpg`
                  "
                >
                  <v-fade-transition>
                    <v-overlay
                      v-if="hover"
                      :opacity="0.3"
                      absolute
                      color="#000000"
                    >
                      <v-btn icon v-bind="attrs" v-on="on">
                        <v-icon> mdi-camera </v-icon>
                      </v-btn>
                    </v-overlay>
                  </v-fade-transition>
                </v-img>
              </v-avatar>
            </v-hover>
          </template>
          <v-card>
            <drag-drop-image
              v-on:image="
                (val) => {
                  changeImage = val;
                }
              "
            ></drag-drop-image>
          </v-card>
        </v-menu>
        <v-radio-group v-model="user.role" mandatory>
          <v-radio :label="$t('keywords.client')" value="Client"></v-radio>
          <v-radio :label="$t('keywords.admin')" value="Admin"></v-radio>
          <v-radio
            :label="$t('keywords.super_user')"
            value="SuperUser"
          ></v-radio>
        </v-radio-group>
      </v-col>
      <v-col cols="9">
        <v-row>
          <v-col>
            <v-text-field
              v-model="user.first_name"
              :label="$t('keywords.first_name')"
              :placeholder="$t('keywords.first_name')"
              outlined
              dense
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="user.last_name"
              :label="$t('keywords.last_name')"
              :placeholder="$t('keywords.last_name')"
              outlined
              dense
            ></v-text-field>
          </v-col>
        </v-row>
        <v-text-field
          v-model="user.email"
          :label="$t('keywords.email')"
          :placeholder="$t('keywords.email')"
          outlined
          dense
        ></v-text-field>
        <v-text-field
          v-model="user.username"
          :label="$t('keywords.username')"
          :placeholder="$t('keywords.username')"
          outlined
          dense
        ></v-text-field>
      </v-col>
    </v-row>
    <div class="alerts">
      <update-alert
        v-if="update.status"
        v-on:input="
          (val) => {
            loading = val;
            update.status = val;
          }
        "
        :_msg="update.msg"
        :_type="update.type"
        :_second="update.second"
        :_alert="update.status"
        :_func="update.func"
        :_item="update.item"
        v-on:updated="save"
      ></update-alert>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "UserCreate",
  components: {
    SubHeader: () => import(`@/layouts/header/SubHeader`),
    DragDropImage: () => import(`./components/UploadImage`),
    UpdateAlert: () => import(`@/components/Alert/UpdateAlert`),
  },
  data() {
    return {
      user: {},
      transparent: "rgba(255, 255, 255, 0)",
      menu: false,
      loading: false,
      update: {
        status: false,
        msg: null,
        second: 100,
        type: "warning",
        func: "putApiUser",
        item: {},
      },
    };
  },
  async created() {
    if (!this.$store.getters.getUser)
      await this.$store.dispatch("getApiUser", this.$route.params.id);
    this.user = this.$store.getters.getUser;
  },
  computed: {
    changeImage: {
      get() {
        return this.user.image_path;
      },
      set(value) {
        this.user.image_path = value;
        this.menu = false;
      },
    },
  },
  methods: {
    handleSave() {
      this.loading = true;
      this.update.item = this.user;
      this.update.msg = this.user.email;
      this.update.second = 100;
      this.update.status = true;
    },
    async save() {
      this.loading = false;
      this.$router.push({ name: "UsersList" });
    },
  },
};
</script>

<style scoped>
.w-100 {
  width: 100%;
}
</style>