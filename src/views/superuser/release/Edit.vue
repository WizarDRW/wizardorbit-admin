<template>
  <v-container>
    <sub-header>
      <template v-slot:buttons>
        <div style="width: 100%; text-align: right">
          <v-btn
            :disabled="loading"
            icon
            color="red"
            @click="$router.push({ name: 'Release' })"
          >
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-btn :loading="loading" icon color="green" @click="handleSave()">
            <v-icon>mdi-content-save-outline</v-icon>
          </v-btn>
        </div>
      </template>
    </sub-header>
    <v-text-field
      v-model="release.option.version"
      prefix="v"
      label="Versiyon Numarası(v0.1.0)"
      placeholder="Versiyon Numarası(v0.1.0)"
      solo
    ></v-text-field>
    <create-content :_descriptions="release.descriptions"></create-content>
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
        v-on:added="save"
      ></update-alert>
    </div>

    <!-- Content ekleme butonu -->
    <speed-dial
      :_bottom="true"
      :_right="true"
      _direction="top"
      :_openOnHover="false"
      _transition="slide-y-reverse-transition"
      :_contents="release.descriptions"
    >
    </speed-dial>
  </v-container>
</template>

<script>
export default {
  components: {
    UpdateAlert: () => import("@/components/Alert/UpdateAlert"),
    SubHeader: () => import(`@/layouts/header/SubHeader`),
    CreateContent: () => import(`@/components/CreateContent.vue`)
  },
  data() {
    return {
      release: {
        type: "release",
        descriptions: [],
        option: {
          version: "",
        },
      },
      update: {
        status: false,
        msg: "Güncelleme işlemi yaklaşık 10sn içinde gerçekleşecektir.",
        second: 100,
        type: "warning",
        func: "putApiRelease",
        item: {},
      },
      isSave: false,
    };
  },
  async created() {
    if (!this.$store.getters.getRelease)
      this.$store.dispatch("getApiRelease", this.$route.params.id);
    this.release = this.$store.getters.getRelease;
  },
  methods: {
    handleSave() {
      this.release.option.version = "v" + this.release.option.version;
      this.loading = true;
      this.update.item = this.release;
      this.update.second = 100;
      this.update.status = true;
    },
    async save() {
      this.isSave = true;
      this.$router.push({ name: "Release" });
    },
  },
};
</script>

<style lang="">
</style>