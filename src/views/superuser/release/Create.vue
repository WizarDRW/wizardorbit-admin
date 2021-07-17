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
      :label="$t('phrases.version_number')"
      :placeholder="$t('phrases.version_number')"
      solo
    ></v-text-field>
    <create-content
      :_descriptions="release.descriptions"
    ></create-content>
    <div class="alerts">
      <add-alert
        v-if="add.status"
        v-on:input="
          (val) => {
            loading = val;
            add.status = val;
          }
        "
        :_msg="add.msg"
        :_type="add.type"
        :_second="add.second"
        :_alert="add.status"
        :_func="add.func"
        :_item="add.item"
        v-on:added="save"
      ></add-alert>
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
    AddAlert: () => import("@/components/Alert/AddAlert"),
    SubHeader: () => import(`@/layouts/header/SubHeader`),
    SpeedDial: () => import(`@/components/SpeedDial.vue`),
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
      add: {
        status: false,
        msg: "Ekleme işlemi yaklaşık 5sn içinde gerçekleşecektir.",
        second: 100,
        type: "warning",
        func: "postApiRelease",
        item: {},
      },
      isSave: false,
    };
  },
  methods: {
    handleSave() {
      this.release.option.version = "v" + this.release.option.version;
      this.loading = true;
      this.add.item = this.release;
      this.add.second = 100;
      this.add.status = true;
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