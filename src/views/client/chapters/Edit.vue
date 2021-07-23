<template>
  <v-container>
    <sub-header :edit_title="chapter.name">
      <template v-slot:buttons>
        <div style="width: 100%; text-align: right">
          <v-tooltip color="error" bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                :disabled="loading"
                icon
                color="error"
                @click="$router.push({ path: '/chapter' })"
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
            _type="chapter"
            :_content="chapter"
            v-on:selectedCategories="(val) => (chapter.categories = val)"
          >
          </left-content>
        </v-col>
        <v-col md="9">
          <v-text-field
            v-model="chapter.name"
            :label="$t('keywords.title')"
            :placeholder="$t('keywords.title')"
            outlined
            :rules="[$rule.required, $rule.min(chapter.name, 10)]"
            dense
            counter
            prepend-inner-icon="mdi-format-title"
          >
            <template #message="{ message }">
              {{ $t(message, { min: 10 }) }}
            </template>
          </v-text-field>
          <v-text-field
            v-model="chapter.short_description"
            :label="$t('keywords.description')"
            :placeholder="$t('keywords.description')"
            outlined
            :rules="[$rule.required, $rule.min(chapter.short_description, 20)]"
            dense
            counter
            prepend-inner-icon="mdi-subtitles-outline"
          >
            <template #message="{ message }">
              {{ $t(message, { min: 20 }) }}
            </template>
          </v-text-field>
          <v-hover v-if="chapter.image_path" v-slot="{ hover }">
            <v-img
              :aspect-ratio="16 / 9"
              :src="chapter.image_path"
              :lazy-src="
                chapter.image_path
                  ? chapter.image_path
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
                            if (chapter.image_path != defaultImage)
                              $store.dispatch(
                                'deleteApiMultipart',
                                chapter.image_path
                              );
                            chapter.image_path = null;
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
            v-model="chapter.image_path"
            :label="$t('phrases.addImage')"
            outlined
            :rules="[$rule.required]"
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
                  :_descriptions="chapter.descriptions"
                ></create-content>
                <!-- Önizleme dialoğu -->
                <preview
                  v-if="preview"
                  :_dialog="preview"
                  :_content="chapter"
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
    </v-form>
    <!-- Content ekleme butonu -->
    <speed-dial
      :_bottom="true"
      :_right="true"
      _direction="top"
      :_openOnHover="false"
      _transition="slide-y-reverse-transition"
      :_contents="chapter.descriptions"
    >
    </speed-dial>
  </v-container>
</template>


<script>
export default {
  name: "ChapterEdit",
  components: {
    Preview: () => import("@/components/Preview"),
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
      selectionType: "leaf",
      selection: [],
      chapter: {
        status: "ModeratorAcceping",
      },
      loading: true,
      categories: [],
      valueConsistsOf: "BRANCH_PRIORITY",
      htmlVision: false,
      preview: false,
      isSave: false,
      defaultImage: null,
      defaultImages: null,
    };
  },
  async mounted() {
    if (
      !this.$store.getters.getCategory ||
      this.$store.getters.getCategory.type !== "chapter"
    )
      await this.$store.dispatch("getApiCategory", "chapter");
    this.categories = this.$store.getters.getCategory.categories;
    this.getChapter();
  },
  methods: {
    async getChapter() {
      if (!this.$store.getters.getChapter)
        await this.$store.dispatch("getApiChapter", this.$route.params.id);
      this.chapter = this.$store.getters.getChapter;
      this.defaultImage = this.chapter.image_path;
      this.defaultImages = this.chapter.descriptions
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
      this.chapter = {};
    },
    getFiles(files) {
      this.chapter.image_path = files.base64;
    },
    async handleSave() {
      this.loading = true;
      var id = await this.$store.dispatch("update", {
        msg: this.chapter._id,
        func: "putApiChapter",
        item: this.chapter,
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
          this.$router.push({ path: "/chapter" });
          clearInterval(this.interval);
        }
      }, 500);
    },
    async onFilePicked(e) {
      var formData = new FormData();
      formData.append("photo", e);
      var id = await this.$store.dispatch("postApiMultipart", formData);
      this.chapter.image_path = `https://drive.google.com/uc?export=view&id=${id}`;
    },
  },
  destroyed() {
    if (!this.isSave) {
      if (this.chapter.image_path != this.defaultImage)
        this.$store.dispatch("deleteApiMultipart", this.chapter.image_path);
      this.defaultImages.forEach((el) => {
        if (el.val != this.chapter.descriptions[el.i].val)
          this.$store.dispatch(
            "deleteApiMultipart",
            this.chapter.descriptions[el.i].val
          );
        this.chapter.descriptions[el.i].val = el.val;
      });
      this.chapter.image_path = this.defaultImage;
    } else {
      if (this.chapter.image_path != this.defaultImage)
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