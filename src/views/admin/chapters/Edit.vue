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
                @click="$router.push({ name: 'AdminChapter' })"
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
          _type="chapter"
          :_content="chapter"
          v-on:selectedCategories="(val) => (chapter.categories = val)"
        >
          <template #showcase>
            <h2><v-icon>mdi-book-open-page-variant</v-icon> {{$t('message.showcase')}}</h2>
            <v-treeview
              v-model="chapter.showcases"
              :items="[
                { id: 'Carousel', label: { tr: 'Slayt', en: 'Slide', fr: 'Faire glisser', de: 'Rutschen'} },
                { id: 'Top6', label: { tr: 'En İyi 6', en: 'Top 6', fr: 'Top 6', de: 'Top 6'} },
              ]"
              :selection-type="selectionType"
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
          v-model="chapter.name"
          :label="$t('message.title')"
          :placeholder="$t('message.title')"
          outlined
          dense
          prepend-inner-icon="mdi-format-title"
        ></v-text-field>
        <v-text-field
          v-model="chapter.short_description"
          :label="$t('message.description')"
          :placeholder="$t('message.description')"
          outlined
          dense
          prepend-inner-icon="mdi-subtitles-outline"
        ></v-text-field>
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
                {{$t('message.loading')}}...
              </v-row>
            </template>
            <v-fade-transition mode="out-in">
              <div v-if="hover" class="">
                <v-btn
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
                  >{{$t('message.deleteImage')}}</v-btn
                >
              </div>
            </v-fade-transition>
          </v-img>
        </v-hover>
        <v-file-input
          v-else
          v-model="chapter.image_path"
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
      :_contents="chapter.descriptions"
    >
    </speed-dial>
  </v-container>
</template>


<script>
import { GET_API_CHAPTER } from "@/core/services/store/chapter.module";
export default {
  name: "AdminChapterEdit",
  components: {
    Preview: () => import("@/components/Preview"),
    UpdateAlert: () => import("@/components/Alert/UpdateAlert"),
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
      chapter: {
        status: "ModeratorAcceping",
        seo: {
          title: "",
          description: "",
        },
      },
      loading: true,
      preview: false,
      update: {
        status: false,
        msg: "Güncelleme işlemi yaklaşık 10sn içinde gerçekleşecektir.",
        second: 100,
        type: "warning",
        func: "putApiChapter",
        item: {},
      },
      isSave: false,
      defaultImage: null,
      defaultImages: null,
    };
  },
  async mounted() {
    this.getChapter();
  },
  methods: {
    async getChapter() {
      if (!this.$store.getters.getChapter)
        await this.$store.dispatch(GET_API_CHAPTER, this.$route.params.id);
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
    handleSave() {
      this.loading = true;
      this.update.item = this.chapter;
      this.update.second = 100;
      this.update.status = true;
    },
    async save() {
      this.isSave = true;
      this.loading = false;
      this.$router.push({ name: "AdminChapter" });
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