<template>
  <v-container>
    <sub-header>
      <template v-slot:buttons>
        <div style="width: 100%; text-align: right">
          <v-tooltip color="error" bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                :disabled="loading"
                icon
                color="error"
                @click="$router.push({ path: '/admin/news' })"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-arrow-left</v-icon>
              </v-btn>
            </template>
            <span>{{$t('keywords.back')}}</span>
          </v-tooltip>
          <!-- Önizleme -->
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                small
                fab
                icon
                @click="preview = !preview"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon> mdi-eye </v-icon>
              </v-btn>
            </template>
            <span>{{$t('keywords.preview')}}</span>
          </v-tooltip>
          <v-tooltip color="success" bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                :loading="loading"
                icon
                color="success"
                @click="handleSave()"
                v-bind="attrs"
                v-on="on"
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
        <left-content
          _type="news"
          :_content="news"
          v-on:selectedCategories="(val) => (news.categories = val)"
        >
          <template #showcase>
            <h2><v-icon>mdi-book-open-page-variant</v-icon> {{$t('keywords.showcase')}}</h2>
            <v-treeview
              v-model="news.showcases"
              :items="[
                { id: 'Carousel', label: { tr: 'Slayt', en: 'Slide', fr: 'Faire glisser', de: 'Rutschen'} },
                { id: 'Top6', label: { tr: 'En İyi 6', en: 'Top 6', fr: 'Top 6', de: 'Top 6'} },
              ]"
              selection-type="leaf"
              selectable
              :item-text="`label[${$store.getters.getLangName}]`"
              open-all
            >
            </v-treeview>
          </template>
        </left-content>
      </v-col>
      <v-col md="9">
        <v-text-field
          v-model="news.name"
          :label="$t('keywords.title')"
          :placeholder="$t('keywords.title')"
          outlined
          dense
          prepend-inner-icon="mdi-format-title"
        ></v-text-field>
        <v-text-field
          v-model="news.short_description"
          :label="$t('keywords.description')"
          :placeholder="$t('keywords.description')"
          outlined
          dense
          prepend-inner-icon="mdi-subtitles-outline"
        ></v-text-field>
        <v-hover v-if="news.image_path" v-slot="{ hover }">
          <v-img
            :aspect-ratio="16 / 9"
            :src="news.image_path"
            lazy-src="https://drive.google.com/uc?export=view&id=1K9QSSEMfJ4uTvixQKGDI9EDqUk_F4MjW"
            max-width="500px"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
                {{$t('phrases.loading')}}...
              </v-row>
            </template>
            <v-fade-transition mode="out-in">
              <div v-if="hover" class="">
                <v-btn
                  @click="
                    () => {
                      $store.dispatch('deleteApiMultipart', chapter.image_path);
                      news.image_path = null;
                    }
                  "
                  color="red"
                  tile
                  >{{$t('phrases.deleteImage')}}</v-btn
                >
              </div>
            </v-fade-transition>
          </v-img>
        </v-hover>
        <v-file-input
          v-else
          v-model="news.image_path"
          :label="$t('phrases.addImage')"
          outlined
          dense
          ref="image"
          accept="image/*"
          @change="onFilePicked"
        ></v-file-input>
        <div class="quill">
          <v-row>
            <v-col>
              <!-- İçerikler -->
              <create-content
                :_descriptions="news.descriptions"
              ></create-content>
              <!-- Önizleme dialoğu -->
              <preview
                v-if="preview"
                :_dialog="preview"
                :_content="news"
                v-on:dialogClose="
                  (value) => {
                    preview = value;
                  }
                "
              ></preview>
            </v-col>
          </v-row>
        </div>
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
    <!-- Content ekleme butonu -->
    <speed-dial
      :_bottom="true"
      :_right="true"
      _direction="top"
      :_openOnHover="false"
      _transition="slide-y-reverse-transition"
      :_contents="news.descriptions"
    >
    </speed-dial>
  </v-container>
</template>


<script>
import { GET_API_CATEGORY } from "@/core/services/store/category.module";
var ObjectID = require("bson-objectid");
export default {
  name: "admin-news-create",
  components: {
    Preview: () => import("@/components/Preview"),
    AddAlert: () => import("@/components/Alert/AddAlert"),
    SubHeader: () => import("@/layouts/header/SubHeader"),
    SpeedDial: () => import(`@/components/SpeedDial.vue`),
    CreateContent: () => import(`@/components/CreateContent.vue`),
    LeftContent: () => import(`@/components/LeftContent.vue`),
  },
  data() {
    return {
      drag: {
        col: 12,
      },
      news: {
        user_id: ObjectID(this.$store.getters.currentUser._id),
        status: "ModeratorAcceping",
        descriptions: [],
        tags: [],
      },
      loading: true,
      preview: false,
      add: {
        status: false,
        msg: "",
        second: 100,
        type: "warning",
        func: "postApiNews",
        item: {},
      },
      isSave: false,
    };
  },
  async created() {
    if (
      !this.$store.getters.getCategory ||
      this.$store.getters.getCategory.type !== "news"
    )
      await this.$store.dispatch(GET_API_CATEGORY, "news");
    this.categories = this.$store.getters.getCategory.categories;
    if (this.categories) this.loading = false;
  },
  methods: {
    reset() {
      this.news = {};
    },
    getFiles(files) {
      this.news.image_path = files.base64;
    },
    handleSave() {
      this.loading = true;
      this.add.item = this.news;
      this.add.msg = this.news.name;
      this.add.second = 100;
      this.add.status = true;
    },
    async save() {
      this.loading = false;
      this.isSave = true;
      this.$router.push({ name: "AdminNews" });
    },
    async onFilePicked(e) {
      var formData = new FormData();
      formData.append("photo", e);
      var id = await this.$store.dispatch("postApiMultipart", formData);
      this.news.image_path = `https://drive.google.com/uc?export=view&id=${id}`;
    },
  },
  destroyed() {
    if (!this.isSave) {
      var data = {
        user_id: ObjectID(this.$store.getters.currentUser._id),
        type: "news",
        data: this.news,
      };
      this.$store.dispatch("postApiDraft", data);
    }
  },
};
</script>

<style lang="scss" scoped>
</style>