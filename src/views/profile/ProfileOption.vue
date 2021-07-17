<template>
  <v-container>
    <sub-header>
      <template v-slot:buttons>
        <div style="width: 100%; text-align: right">
          <v-tooltip color="green" bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                :loading="loading"
                v-bind="attrs"
                v-on="on"
                icon
                color="green"
                @click="handleSave()"
              >
                <v-icon>mdi-content-save-outline</v-icon>
              </v-btn>
            </template>
            <span>{{$t('keywords.save')}}</span>
          </v-tooltip>
        </div>
      </template>
    </sub-header>
    <v-row>
      <v-col md="3">
        <v-expansion-panels v-model="panel" inset>
          <v-expansion-panel>
            <v-expansion-panel-header>{{$t('keywords.views')}}</v-expansion-panel-header>
            <v-expansion-panel-content>
              <p>{{$t('phrases.user_view_settings')}}</p>
              <v-checkbox
                v-model="option.isViewImagePath"
                hide-details
                :label="$t('phrases.user_image')"
              ></v-checkbox>
              <v-checkbox
                v-model="option.isViewFirstName"
                hide-details
                :label="$t('keywords.first_name')"
              ></v-checkbox>
              <v-checkbox
                v-model="option.isViewLastName"
                hide-details
                :label="$t('keywords.last_name')"
              ></v-checkbox>
              <v-checkbox
                v-if="option.isViewFirstName && option.isViewLastName"
                v-model="option.isReveseFullName"
                hide-details
                :label="$t('keywords.reverse_full_name')"
              ></v-checkbox>
              <v-checkbox
                v-model="option.isViewUserName"
                hide-details
                :label="$t('keywords.username')"
              ></v-checkbox>
              <v-checkbox
                v-model="option.isViewEmail"
                hide-details
                :label="$t('keywords.email')"
              ></v-checkbox>
              <v-checkbox
                v-model="option.isViewDescription"
                hide-details
                :label="$t('keywords.biography')"
              ></v-checkbox>
              <v-checkbox
                v-model="option.isViewTitle"
                hide-details
                :label="$t('keywords.degree')"
              ></v-checkbox>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header>{{$t('keywords.theme')}}</v-expansion-panel-header>
            <v-expansion-panel-content>
              <p>
                {{$t('message.theme_select')}}
              </p>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
      <v-col md="9">
        <user-preview
          v-if="panel == 0"
          :_isViewFirstName="option.isViewFirstName"
          :_isViewLastName="option.isViewLastName"
          :_isReveseFullName="option.isReveseFullName"
          :_isViewUserName="option.isViewUserName"
          :_isViewEmail="option.isViewEmail"
          :_isViewDescription="option.isViewDescription"
          :_isViewImagePath="option.isViewImagePath"
          :_isViewTitle="option.isViewTitle"
        ></user-preview>
        <theme
          v-else-if="panel == 1"
          :_dark="option.dark"
          :_light="option.light"
          v-on:items="themes"
        ></theme>
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
  components: {
    SubHeader: () => import("@/layouts/header/SubHeader"),
    UserPreview: () => import(`./components/UserPreview.vue`),
    Theme: () => import(`./components/Theme.vue`),
    UpdateAlert: () => import("@/components/Alert/UpdateAlert"),
  },
  data() {
    return {
      panel: 0,
      option: {},
      loading: true,
      update: {
        status: false,
        msg: "Güncelleme işlemi yaklaşık 10sn içinde gerçekleşecektir.",
        second: 100,
        type: "warning",
        func: "putApiUserOption",
        item: {},
      },
    };
  },
  async created() {
    if (!this.$store.getters.getUserIdOption)
      await this.$store.dispatch(
        "getApiUserIdOption",
        this.$store.getters.currentUser._id
      );
    this.option = this.$store.getters.getUserIdOption;
    if (this.option) this.loading = false;
  },
  methods: {
    themes(payload) {
      this.option.dark =
        payload.find((x) => x.mode == "dark") &&
        payload.find((x) => x.mode == "dark")._id;
      this.option.light =
        payload.find((x) => x.mode == "light") &&
        payload.find((x) => x.mode == "light")._id;
    },
    handleSave() {
      this.loading = true;
      this.update.item = this.option;
      this.update.second = 100;
      this.update.status = true;
    },
    save() {
      this.loading = false;
    },
  },
};
</script>

<style scoped>
</style>