<template>
  <v-container>
    <sub-header>
      <template v-slot:buttons>
        <div style="width: 100%; text-align: right">
          <v-btn
            :disabled="loading"
            icon
            color="red"
            @click="$router.push({ name: 'AdminForum' })"
          >
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-btn :loading="loading" icon color="green" @click="handleSave()">
            <v-icon>mdi-content-save-outline</v-icon>
          </v-btn>
        </div>
      </template>
    </sub-header>
    <v-row>
      <v-col md="3">
        <left-content
          _type="forum"
          :_content="forum"
          v-on:selectedCategories="(val) => (forum.categories = val)"
        >
          <template #showcase>
            <h2><v-icon>mdi-book-open-page-variant</v-icon> Vitrin</h2>
            <v-treeview
              v-model="forum.showcases"
              :items="[{ id: 'Advertisement', label: 'Reklam' }]"
              selection-type="leaf"
              selectable
              item-text="label"
              open-all
            >
            </v-treeview>
          </template>
          <template #short_description>
            <v-textarea
              v-model="forum.short_description"
              outlined
              dense
              hide-details
              rows="3"
              label="Açıklama"
              placeholder="Açıklama"
              prepend-inner-icon="mdi-card-text-outline"
            ></v-textarea>
          </template>
        </left-content>
      </v-col>
      <v-col md="9">
        <v-text-field
          v-model="forum.name"
          label="Başlık"
          placeholder="Başlık"
          outlined
          dense
          prepend-inner-icon="mdi-format-title"
        ></v-text-field>
        <tiptap :_content="forum">
          <template #default="{ extensions }">
            <tiptap-vuetify
              v-model="forum.description"
              placeholder="Yazınız…"
              :extensions="extensions"
              :toolbar-attributes="{ color: 'black' }"
            >
            </tiptap-vuetify>
          </template>
        </tiptap>
      </v-col>
    </v-row>
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
  </v-container>
</template>

<script>
import { TiptapVuetify } from "tiptap-vuetify";
var ObjectID = require("bson-objectid");
export default {
  components: {
    Tiptap: () => import("@/components/Tiptap"),
    AddAlert: () => import("@/components/Alert/AddAlert"),
    SubHeader: () => import("@/layouts/header/SubHeader"),
    LeftContent: () => import(`@/components/LeftContent.vue`),
    TiptapVuetify,
  },
  data() {
    return {
      forum: {
        user_id: ObjectID(this.$store.getters.currentUser._id),
        status: "ModeratorAcceping",
        connects: [],
        comments: [],
        tags: [],
        showcases: [],
      },
      selectionType: "leaf",
      selection: [],
      categories: [],
      tags: [],
      loading: false,
      add: {
        status: false,
        msg: "Ekleme işlemi yaklaşık 5sn içinde gerçekleşecektir.",
        second: 100,
        type: "warning",
        func: "postApiForum",
        item: {},
      },
      isSave: false,
    };
  },
  methods: {
    handleSave() {
      this.loading = true;
      this.add.item = this.forum;
      this.add.second = 100;
      this.add.status = true;
    },
    async save() {
      this.loading = false;
      this.isSave = true;
      this.$router.push({ name: "AdminForum" });
    },
  },
  destroyed() {
    if (!this.isSave) {
      var data = {
        user_id: ObjectID(this.$store.getters.currentUser._id),
        type: "forum",
        data: this.forum,
      };
      this.$store.dispatch("postApiDraft", data);
    }
  },
};
</script>

<style lang="scss" scoped>
</style>