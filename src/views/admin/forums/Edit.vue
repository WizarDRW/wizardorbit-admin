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
                :label="$t('message.description')"
                :placeholder="$t('message.description')"
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
import { GET_API_FORUM } from "@/core/services/store/forum.module";
export default {
  components: {
    Tiptap: () => import("@/components/Tiptap"),
    SubHeader: () => import("@/layouts/header/SubHeader"),
    LeftContent: () => import(`@/components/LeftContent.vue`),
    TiptapVuetify,
  },
  data() {
    return {
      forum: {},
      loading: true,
      disable: true
    };
  },
  async mounted() {
    this.getForum();
  },
  methods: {
    async getForum() {
      if (!this.$store.getters.getForum)
        await this.$store.dispatch(GET_API_FORUM, this.$route.params.id);
      this.forum = this.$store.getters.getForum;
      if (this.forum) this.loading = false;
    },
    handleSave() {
      this.forum.status = "ModeratorAcceping";
      this.loading = true;
      var queue = this.$store.dispatch("update", {
        msg: this.forum._id,
        func: "putApiForum",
        item: this.forum,
      });
      if (queue) this.save();
    },
    async save() {
      this.loading = false;
      this.$router.push({ name: "AdminForum" });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>