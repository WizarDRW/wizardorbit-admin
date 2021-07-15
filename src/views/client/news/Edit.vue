<template>
  <v-container>
    <sub-header :edit_title="news.name">
      <template v-slot:buttons>
        <div style="width: 100%; text-align: right">
          <v-tooltip color="error" bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                :disabled="loading"
                icon
                color="error"
                @click="$router.push({ name: 'News' })"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-arrow-left</v-icon>
              </v-btn>
            </template>
            <span>{{$t('message.back')}}</span>
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
            <span>{{$t('message.preview')}}</span>
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
            <span>{{$t('message.save')}}</span>
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
        ></left-content>
      </v-col>
      <v-col md="9">
        <v-text-field
          v-model="news.name"
          :label="$t('news.new.title')"
          :placeholder="$t('news.new.title')"
          outlined
          dense
          prepend-icon="mdi-format-title"
        ></v-text-field>
        <v-text-field
          v-model="news.short_description"
          :label="$t('news.new.description')"
          :placeholder="$t('news.new.description')"
          outlined
          dense
          prepend-icon="mdi-subtitles-outline"
        ></v-text-field>
        <v-hover v-if="news.image_path" v-slot="{ hover }">
          <v-img
            :aspect-ratio="16 / 9"
            :src="news.image_path"
            :lazy-src="
              news.image_path
                ? news.image_path
                : 'https://drive.google.com/uc?export=view&id=1K9QSSEMfJ4uTvixQKGDI9EDqUk_F4MjW'
            "
            max-width="500px"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
                {{$t('message.loading')}}...
              </v-row>
            </template>
            <v-fade-transition mode="out-in">
              <div v-if="hover" class="">
                <v-btn
                  @click="
                    () => {
                      if (news.image_path != defaultImage)
                        $store.dispatch(
                          'deleteApiMultipart',
                          news.image_path
                        );
                      news.image_path = null;
                    }
                  "
                  color="red"
                  tile
                  >{{$t('message.deleteImage')}}</v-btn
                >
              </div>
            </v-fade-transition>
          </v-img>
        </v-hover>
        <v-file-input
          v-else
          v-model="news.image_path"
          :label="$t('message.addImage')"
          outlined
          dense
          ref="image"
          accept="image/*"
          @change="onFilePicked"
        ></v-file-input>
        <br />
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
              <!-- Bilgi bankası dialoğu -->
              <info-bank
                v-if="info"
                :_dialog="info"
                :_componentId="info_componentId"
                v-on:dialogClose="
                  (value) => {
                    info = value;
                  }
                "
              ></info-bank>
              <!-- Önizleme -->
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    @click="preview = !preview"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon> mdi-eye </v-icon>
                  </v-btn>
                </template>
                <span>Önizle</span>
              </v-tooltip>
            </v-col>
          </v-row>
        </div>
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
import { GET_API_NEWS } from "@/core/services/store/news.module";
import { GET_API_CATEGORY } from "@/core/services/store/category.module";
export default {
  name: "EditNews",
  components: {
    Preview: () => import("@/components/Preview"),
    UpdateAlert: () => import("@/components/Alert/UpdateAlert"),
    SubHeader: () => import("@/layouts/header/SubHeader"),
    SpeedDial: () => import(`@/components/SpeedDial.vue`),
    CreateContent: () => import(`@/components/CreateContent.vue`),
  },
  data() {
    return {
      info: false,
      info_componentId: "",
      drag: {
        col: 12,
      },
      selectionType: "leaf",
      selection: [],
      news: {
        descriptions: [],
        status: "ModeratorAcceping",
      },
      loading: false,
      categories: [],
      valueConsistsOf: "BRANCH_PRIORITY",
      preview: false,
      update: {
        status: false,
        msg: "Güncelleme işlemi yaklaşık 10sn içinde gerçekleşecektir.",
        second: 100,
        type: "warning",
        func: "putApiNews",
        item: {},
      },
      isSave: false,
      defaultImage: null,
      defaultImages: null,
    };
  },
  async mounted() {
    if (
      !this.$store.getters.getCategory ||
      this.$store.getters.getCategory.type !== "news"
    )
      await this.$store.dispatch(GET_API_CATEGORY, "news");
    this.categories = this.$store.getters.getCategory.categories;
    this.getNews();
  },
  methods: {
    async getNews() {
      if (!this.$store.getters.getNews)
        await this.$store.dispatch(GET_API_NEWS, this.$route.params.id);
      this.news = this.$store.getters.getNews;
      this.defaultImage = this.news.image_path;
      this.defaultImages = this.news.descriptions
        .map((x, i) => {
          if (x.type == "image")
            return {
              i: i,
              val: x.val,
            };
        })
        .filter((x) => x != undefined);
      this.loading = false;
    },
    reset() {
      this.news = {};
    },
    getFiles(files) {
      this.news.image_path = files.base64;
    },
    handleSave() {
      this.loading = true;
      this.update.item = this.news;
      this.update.second = 100;
      this.update.status = true;
    },
    async save() {
      this.isSave = true;
      this.loading = false;
      this.$router.push({ name: "News" });
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
      if (this.news.image_path != this.defaultImage)
        this.$store.dispatch("deleteApiMultipart", this.news.image_path);
      this.defaultImages.forEach((el) => {
        if (el.val != this.news.descriptions[el.i].val)
          this.$store.dispatch(
            "deleteApiMultipart",
            this.news.descriptions[el.i].val
          );
        this.news.descriptions[el.i].val = el.val;
      });
      this.news.image_path = this.defaultImage;
    } else {
      if (this.news.image_path != this.defaultImage)
        this.$store.dispatch("deleteApiMultipart", this.defaultImage);
      this.defaultImages.forEach((el) => {
        if (el.val != this.chapter.descriptions[el.i].val)
          this.$store.dispatch("deleteApiMultipart", el.val);
      });
    }
  },
};
</script>

<style lang="scss" scoped>
</style>