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
      item-text="label"
      label="Tip"
      solo
    ></v-select>
    <create-content
      :_descriptions="about.descriptions"
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
      :_contents="about.descriptions"
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
      about: {
        descriptions: [],
        option: {},
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
      this.loading = true;
      this.add.item = this.about;
      this.add.second = 100;
      this.add.status = true;
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