<template>
  <v-container>
    <sub-header>
      <template v-slot:buttons>
        <div style="width: 100%; text-align: right">
          <v-btn
            :disabled="loading"
            icon
            color="red"
            @click="$router.push({ name: 'Forum' })"
          >
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-btn
            :loading="loading"
            :disabled="disable"
            icon
            color="green"
            @click="handleSave()"
          >
            <v-icon>mdi-content-save-outline</v-icon>
          </v-btn>
        </div>
      </template>
    </sub-header>
    <v-form @input="(val) => (disable = !val)">
      <v-row>
        <v-col md="3">
          <left-content
            _type="forum"
            :_content="forum"
            v-on:selectedCategories="(val) => (forum.categories = val)"
          >
            <template #short_description>
              <v-textarea
                v-model="forum.short_description"
                outlined
                dense
                hide-details
                rows="3"
                :label="$t('keywords.description')"
                :placeholder="$t('keywords.description')"
                prepend-inner-icon="mdi-card-text-outline"
              ></v-textarea>
            </template>
          </left-content>
        </v-col>
        <v-col md="9">
          <v-text-field
            v-model="forum.name"
            :label="$t('keywords.title')"
            :placeholder="$t('keywords.title')"
            :rules="[$rule.required, $rule.min(forum.name, 10)]"
            outlined
            counter
            dense
            prepend-inner-icon="mdi-format-title"
          >
            <template #message="{ message }">
              {{ $t(message, { min: 10 }) }}
            </template>
          </v-text-field>
          <tiptap :_content="forum">
            <template #default="{ extensions }">
              <tiptap-vuetify
                v-model="forum.description"
                :placeholder="`${$t('keywords.write')}…`"
                :extensions="extensions"
                :toolbar-attributes="{ color: 'black' }"
              >
              </tiptap-vuetify>
            </template>
          </tiptap>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import { TiptapVuetify } from "tiptap-vuetify";
var ObjectID = require("bson-objectid");
export default {
  components: {
    Tiptap: () => import("@/components/Tiptap"),
    SubHeader: () => import("@/layouts/header/SubHeader"),
    LeftContent: () => import(`@/components/LeftContent.vue`),
    TiptapVuetify,
  },
  data() {
    return {
      forum: {
        name: "",
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
      loading: true,
      isSave: false,
      draftid: null,
      disable: true
    };
  },
  async created() {
    if (
      !this.$store.getters.getCategory ||
      this.$store.getters.getCategory.type !== "forum"
    )
      await this.$store.dispatch('getApiCategory', "forum");
    this.categories = this.$store.getters.getCategory.categories;
    if (this.categories) this.loading = false;

    if (this.$route.params.draftid) {
      this.draftid = this.$route.params.draftid;
      if (!this.$store.getters.getDraft)
        await this.$store.dispatch("getApiDraft", this.$route.params.draftid);
      this.forum = this.$store.getters.getDraft.data;
    }
  },
  methods: {
    handleSave() {
      this.loading = true;
      var queue = this.$store.dispatch("add", {
        msg: this.forum.name,
        func: "postApiForum",
        item: this.forum,
      });
      if (queue) this.save();
    },
    async save() {
      if (this.draftid) this.$store.dispatch("deleteApiDraft", this.draftid);
      this.isSave = true;
      this.$router.push({ name: "Forum" });
    },
  },
  destroyed() {
    if (this.draftid) {
      this.$store.getters.getDraft.data = this.chapter;
      this.$store.dispatch("putApiDraft", this.$store.getters.getDraft);
    } else if (!this.isSave) {
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