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
                @click="$router.push({ name: 'News' })"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-arrow-left</v-icon>
              </v-btn>
            </template>
            <span>{{ $t("keywords.back") }}</span>
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
            <span>{{ $t("keywords.preview") }}</span>
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
                :disabled="disable"
              >
                <v-icon>mdi-content-save-outline</v-icon>
              </v-btn>
            </template>
            <span>{{ $t("keywords.save") }}</span>
          </v-tooltip>
        </div>
      </template>
    </sub-header>
    <v-form @input="(val) => (disable = !val)">
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
            :label="$t('keywords.title')"
            :placeholder="$t('keywords.title')"
            :rules="[$rule.required, $rule.min(news.name, 10)]"
            prepend-icon="mdi-format-title"
            outlined
            counter
            dense
          >
            <template #message="{ message }">
              {{ $t(message, { min: 10 }) }}
            </template>
          </v-text-field>
          <v-text-field
            v-model="news.short_description"
            :label="$t('keywords.description')"
            :placeholder="$t('keywords.description')"
            :rules="[$rule.required, $rule.min(news.short_description, 20)]"
            prepend-icon="mdi-subtitles-outline"
            outlined
            counter
            dense
          >
            <template #message="{ message }">
              {{ $t(message, { min: 20 }) }}
            </template>
          </v-text-field>
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
                  {{ $t("phrases.loading") }}...
                </v-row>
              </template>
              <v-fade-transition mode="out-in">
                <v-overlay v-if="hover" :opacity="0.3" absolute color="#000000">
                  <v-tooltip color="error" bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        v-bind="attrs"
                        v-on="on"
                        @click="
                          () => {
                            $store.dispatch(
                              'deleteApiMultipart',
                              news.image_path
                            );
                            news.image_path = null;
                          }
                        "
                        color="red"
                        fab
                        small
                        ><v-icon>mdi-delete-outline</v-icon></v-btn
                      >
                    </template>
                    <span>{{ $t("keywords.delete") }}</span>
                  </v-tooltip>
                </v-overlay>
              </v-fade-transition>
            </v-img>
          </v-hover>
          <v-file-input
            v-else
            v-model="news.image_path"
            :label="$t('phrases.addImage')"
            :rules="[$rule.required]"
            outlined
            dense
            ref="image"
            accept="image/*"
            @change="onFilePicked"
          >
            <template #message="{ message }">
              {{ $t(message) }}
            </template>
          </v-file-input>
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
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </v-form>
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
var ObjectID = require("bson-objectid");
export default {
  name: "NewsCreate",
  components: {
    Preview: () => import("@/components/Preview"),
    SubHeader: () => import("@/layouts/header/SubHeader"),
    SpeedDial: () => import(`@/components/SpeedDial.vue`),
    CreateContent: () => import(`@/components/CreateContent.vue`),
    LeftContent: () => import(`@/components/LeftContent.vue`),
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
        name: "",
        short_description: "",
        user_id: ObjectID(this.$store.getters.currentUser._id),
        status: "ModeratorAcceping",
        descriptions: [],
        tags: [],
      },
      loading: true,
      categories: [],
      valueConsistsOf: "BRANCH_PRIORITY",
      tags: [],
      preview: false,
      isSave: false,
      draftid: null,
      disable: true,
    };
  },
  async created() {
    if (
      !this.$store.getters.getCategory ||
      this.$store.getters.getCategory.type !== "news"
    )
      await this.$store.dispatch("getApiCategory", "news");
    this.categories = this.$store.getters.getCategory.categories;
    if (this.categories) this.loading = false;

    if (this.$route.params.draftid) {
      this.draftid = this.$route.params.draftid;
      if (!this.$store.getters.getDraft)
        await this.$store.dispatch("getApiDraft", this.$route.params.draftid);
      this.news = this.$store.getters.getDraft.data;
    }
  },
  methods: {
    reset() {
      this.news = {};
    },
    getFiles(files) {
      this.news.image_path = files.base64;
    },
    async handleSave() {
      this.loading = true;
      var id = await this.$store.dispatch("add", {
        msg: this.news.name,
        func: "postApiNews",
        item: this.news,
      });
      this.save(id);
    },
    save(id) {
      if (this.draftid) this.$store.dispatch("deleteApiDraft", this.draftid);
      this.interval = setInterval(() => {
        if (
          this.$store.getters.getResultQueues.filter((x) => x.id == id).length >
          0
        ) {
          this.$store.commit("destroyResultQueue", id);
          this.loading = false;
          this.isSave = true;
          this.$router.push({ name: "News" });
          clearInterval(this.interval);
        }
      }, 500);
    },
    async onFilePicked(e) {
      var formData = new FormData();
      formData.append("photo", e);
      var id = await this.$store.dispatch("postApiMultipart", formData);
      this.news.image_path = `https://drive.google.com/uc?export=view&id=${id}`;
    },
  },
  destroyed() {
    if (this.draftid) {
      this.$store.getters.getDraft.data = this.news;
      this.$store.dispatch("putApiDraft", this.$store.getters.getDraft);
    } else if (!this.isSave) {
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