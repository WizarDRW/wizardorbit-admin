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
        <h2><v-icon>mdi-shape</v-icon> Kategori</h2>
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
            {{ item.label }}
          </template>
        </v-treeview>
        <p></p>
        <h2><v-icon>mdi-book-open-page-variant</v-icon> Vitrin</h2>
        <v-treeview
          v-model="forum.showcases"
          :items="[{ id: 'Advertisement', label: 'Reklam' }]"
          :selection-type="selectionType"
          selectable
          item-text="label"
          open-all
        >
        </v-treeview>
        <p></p>
        <h2><v-icon>mdi-semantic-web</v-icon> SEO</h2>
        <p></p>
        <v-text-field
          v-model="forum.name"
          label="Başlık"
          placeholder="Başlık"
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
          label="Açıklama"
          placeholder="Açıklama"
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
                  forum.tags.push({ key: '', tag: '' });
                }
              "
            >
              <v-icon> mdi-plus </v-icon>
            </v-btn>
          </template>
          <span>Etiket Ekle</span>
        </v-tooltip>
        <div v-for="(item, index) in forum.tags" :key="index">
          <v-text-field
            v-model="item.key"
            label="Anahtar"
            placeholder="Anahtar"
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
                    forum.tags.splice(index, 1);
                  }
                "
              >
                <v-icon>mdi-minus</v-icon>
              </v-btn>
            </template>
          </v-text-field>
          <v-text-field
            v-model="item.tag"
            label="Etiket"
            placeholder="Etiket"
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
import { GET_API_CATEGORY } from "@/core/services/store/category.module";
var ObjectID = require("bson-objectid");
export default {
  components: {
    Tiptap: () => import("@/components/Tiptap"),
    AddAlert: () => import("@/components/Alert/AddAlert"),
    SubHeader: () => import("@/layouts/header/SubHeader"),
    TiptapVuetify
  },
  data() {
    return {
      forum: {
        user_id: ObjectID(this.$store.getters.currentUser._id),
        status: "ModeratorAcceping",
        connects: [],
        comments: [],
        tags: [],
        showcases: []
      },
      selectionType: "leaf",
      selection: [],
      categories: [],
      tags: [],
      loading: true,
      add: {
        status: false,
        msg: "Ekleme işlemi yaklaşık 5sn içinde gerçekleşecektir.",
        second: 100,
        type: "warning",
        func: "postApiForum",
        item: {},
      },
    };
  },
  async created() {
    if (
      !this.$store.getters.getCategory ||
      this.$store.getters.getCategory.type !== "forum"
    )
      await this.$store.dispatch(GET_API_CATEGORY, "forum");
    this.categories = this.$store.getters.getCategory.categories;
    if (this.categories) this.loading = false;
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
      this.$router.push({ name: "AdminForum" });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>