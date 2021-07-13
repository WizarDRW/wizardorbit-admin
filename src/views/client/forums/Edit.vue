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
          <v-btn :loading="loading" icon color="green" @click="handleSave()">
            <v-icon>mdi-content-save-outline</v-icon>
          </v-btn>
        </div>
      </template>
    </sub-header>
    <v-row>
      <v-col md="3">
        <h2>{{$t('message.category')}}</h2>
        <v-treeview
          v-model="forum.categories"
          :items="categories"
          :selection-type="selectionType"
          selectable
          return-object
          item-text="label"
          open-all
        >
          <template v-slot:prepend="{ item }">
            <v-icon>
              {{ item.icon }}
            </v-icon>
            {{ item.label[$store.getters.getLangName] }}
          </template>
        </v-treeview>
        <p></p>
        <h2><v-icon>mdi-semantic-web</v-icon> SEO</h2>
        <p></p>
        <v-text-field
          v-model="forum.name"
          :label="$t('forum.new.title')"
          :placeholder="$t('forum.new.title')"
          outlined
          dense
          disabled
          prepend-inner-icon="mdi-format-title"
        ></v-text-field>
        <v-textarea
          v-model="forum.short_description"
          outlined
          dense
          hide-details
          rows="3"
          :label="$t('forum.new.description')"
          :placeholder="$t('forum.new.description')"
          prepend-inner-icon="mdi-card-text-outline"
        ></v-textarea>
        <v-tooltip color="green" bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="success"
              icon
              v-bind="attrs"
              v-on="on"
              @click="
                () => {
                  chapter.tags.push({ key: '', tag: '' });
                }
              "
            >
              <v-icon> mdi-plus </v-icon>
            </v-btn>
          </template>
          <span>{{$t('forum.new.addTag.main')}}</span>
        </v-tooltip>
        <div v-for="(item, index) in forum.tags" :key="item">
          <v-text-field
            v-model="item.key"
            :label="$t('forum.new.addTag.key')"
            :placeholder="$t('forum.new.addTag.key')"
            outlined
            dense
            hide-details
            prepend-inner-icon="mdi-key"
            prepend-icon="mdi-minus"
          >
            <template #prepend>
              <v-btn
                color="error"
                icon
                @click="
                  () => {
                    chapter.tags.splice(index, 1);
                  }
                "
              >
                <v-icon>mdi-minus</v-icon>
              </v-btn>
            </template>
          </v-text-field>
          <v-text-field
            v-model="item.tag"
            :label="$t('forum.new.addTag.tag')"
            :placeholder="$t('forum.new.addTag.tag')"
            outlined
            dense
            hide-details
            append-icon="mdi-tag-outline"
          ></v-text-field>
          <br />
        </div>
      </v-col>
      <v-col md="9">
        <v-text-field
          v-model="forum.name"
          :label="$t('forum.new.title')"
          :placeholder="$t('forum.new.title')"
          outlined
          dense
          prepend-inner-icon="mdi-format-title"
        ></v-text-field>
        <tiptap :_content="forum">
          <template #default="{ extensions }">
            <tiptap-vuetify
              v-model="forum.description"
              :placeholder="`${$t('message.write')}…`"
              :extensions="extensions"
              :toolbar-attributes="{ color: 'black' }"
            >
            </tiptap-vuetify>
          </template>
        </tiptap>
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
import { TiptapVuetify } from "tiptap-vuetify";
import { GET_API_FORUM } from "@/core/services/store/forum.module";
import { GET_API_CATEGORY } from "@/core/services/store/category.module";
export default {
  components: {
    Tiptap: () => import("@/components/Tiptap"),
    UpdateAlert: () => import("@/components/Alert/UpdateAlert"),
    SubHeader: () => import("@/layouts/header/SubHeader"),
    TiptapVuetify,
  },
  data() {
    return {
      forum: {},
      selectionType: "leaf",
      selection: [],
      categories: [],
      loading: true,
      update: {
        status: false,
        msg: "Güncelleme işlemi yaklaşık 10sn içinde gerçekleşecektir.",
        second: 100,
        type: "warning",
        func: "putApiForum",
        item: {},
      },
    };
  },
  async mounted() {
    if (
      !this.$store.getters.getCategory ||
      this.$store.getters.getCategory.type !== "forum"
    )
      await this.$store.dispatch(GET_API_CATEGORY, "forum");
    this.categories = this.$store.getters.getCategory.categories;
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
      this.update.item = this.forum;
      this.update.second = 100;
      this.update.status = true;
    },
    async save() {
      this.loading = false;
      this.$router.push({ name: "Forum" });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>