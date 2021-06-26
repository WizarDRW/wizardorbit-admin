<template>
  <v-container>
    <sub-header>
      <template v-slot:buttons>
        <div style="width: 100%; text-align: right">
          <v-btn
            :disabled="loading"
            icon
            color="red"
            @click="$router.push({ name: 'About' })"
          >
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-btn :loading="loading" icon color="green" @click="handleSave()">
            <v-icon>mdi-content-save-outline</v-icon>
          </v-btn>
        </div>
      </template>
    </sub-header>
    <v-select
      v-model="about.type"
      :items="[
        { label: 'Biz Kimiz', id: 'whoweare' },
        { label: 'Hikaye', id: 'ourhistory' },
        { label: 'Plan', id: 'ourplan' },
      ]"
      label="Tip"
      item-text="label"
      item-value="id"
      solo
      hide-details
    ></v-select>
    <create-content
      :_descriptions="about.descriptions"
    ></create-content>
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

    <!-- Content ekleme butonu -->
    <speed-dial
      :_bottom="true"
      :_right="true"
      _direction="top"
      :_openOnHover="false"
      _transition="slide-y-reverse-transition"
      :_contents="about.descriptions"
    >
    </speed-dial>
  </v-container>
</template>

<script>
export default {
  components: {
    UpdateAlert: () => import("@/components/Alert/UpdateAlert"),
    SubHeader: () => import(`@/layouts/header/SubHeader`),
    SpeedDial: () => import(`@/components/SpeedDial.vue`),
    CreateContent: () => import(`@/components/CreateContent.vue`)
  },
  data() {
    return {
      about: {
        descriptions: [],
        option: {},
      },
      update: {
        status: false,
        msg: "Ekleme işlemi yaklaşık 10sn içinde gerçekleşecektir.",
        second: 100,
        type: "warning",
        func: "putApiAbout",
        item: {},
      },
      isSave: false,
      loading: false,
    };
  },
  async mounted() {
    if (!this.$store.getters.getAbout)
      await this.$store.dispatch("getApiAbout", this.$route.params.id);
    this.about = this.$store.getters.getAbout;
  },
  methods: {
    handleSave() {
      this.loading = true;
      this.update.item = this.about;
      this.update.second = 100;
      this.update.status = true;
    },
    async save() {
      this.isSave = true;
      this.$router.push({ name: "About" });
    },
  },
};
</script>

<style scoped>
</style>