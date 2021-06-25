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
            <span>Geri</span>
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
            <span>Önizle</span>
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
            <span>Kaydet</span>
          </v-tooltip>
        </div>
      </template>
    </sub-header>
    <v-row>
      <v-col md="3">
        <h2><v-icon>mdi-shape</v-icon> Kategori</h2>
        <v-treeview
          v-model="chapter.categories"
          :items="categories"
          :selection-type="selectionType"
          selectable
          item-text="label"
          open-all
          return-object
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
          v-model="chapter.showcases"
          :items="[
            { id: 'Carousel', label: 'Slayt' },
            { id: 'Top6', label: 'En İyi 6' },
          ]"
          :selection-type="selectionType"
          selectable
          item-text="label"
          open-all
        >
        </v-treeview>
        <p></p>
        <h2><v-icon>mdi-search-web</v-icon> SEO</h2>
        <p></p>
        <v-text-field
          v-model="chapter.name"
          label="Başlık"
          placeholder="Başlık"
          outlined
          dense
          disabled
          prepend-inner-icon="mdi-format-title"
        ></v-text-field>
        <v-text-field
          v-model="chapter.short_description"
          label="Açıklama"
          placeholder="Açıklama"
          outlined
          dense
          disabled
          hide-details
          prepend-inner-icon="mdi-card-text-outline"
        ></v-text-field>
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
          <span>Etiket Ekle</span>
        </v-tooltip>
        <div v-for="(item, index) in chapter.tags" :key="item">
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
          v-model="chapter.name"
          label="Başlık"
          placeholder="Başlık"
          outlined
          dense
          prepend-inner-icon="mdi-format-title"
        ></v-text-field>
        <v-text-field
          v-model="chapter.short_description"
          label="Kısa Açıklama"
          placeholder="Kısa Açıklama"
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
                Yükleniyor...
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
                  >Sil</v-btn
                >
              </div>
            </v-fade-transition>
          </v-img>
        </v-hover>
        <v-file-input
          v-else
          v-model="chapter.image_path"
          label="Resim Ekle"
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
              <div v-for="(item, index) in chapter.descriptions" :key="index">
                <!-- Card Title -->
                <div v-if="item.type == 'v-card-title'">
                  <v-text-field
                    v-model="item.val"
                    label="Kart Başlığı"
                    placeholder="Kart Başlığı"
                    append-icon="mdi-delete-variant"
                    @click:append="
                      () => {
                        chapter.descriptions.splice(index, 1);
                      }
                    "
                    solo
                  ></v-text-field>
                </div>
                <!-- Card Subtitle -->
                <div v-if="item.type == 'v-card-subtitle'">
                  <v-text-field
                    v-model="item.val"
                    label="Kart Destek Başlığı"
                    placeholder="Kart Destek Başlığı"
                    append-icon="mdi-delete-variant"
                    @click:append="
                      () => {
                        chapter.descriptions.splice(index, 1);
                      }
                    "
                    solo
                  ></v-text-field>
                </div>
                <!-- Card Text -->
                <div v-if="item.type == 'v-card-text'">
                  <v-textarea
                    v-model="item.val"
                    label="Kart Metni"
                    placeholder="Kart Metni"
                    append-icon="mdi-delete-variant"
                    @click:append="
                      () => {
                        chapter.descriptions.splice(index, 1);
                      }
                    "
                    solo
                  ></v-textarea>
                </div>
                <!-- Markdown üst butonları -->
                <div v-if="item.type == 'markdown'">
                  <markdown
                    :_content="item"
                    v-on:delete_item="
                      () => {
                        chapter.descriptions.splice(index, 1);
                      }
                    "
                  ></markdown>
                </div>
                <!-- Code editor içeriği -->
                <div v-if="item.type == 'code'">
                  <code-block
                    :_code="item"
                    v-on:delete_item="
                      () => {
                        chapter.descriptions.splice(index, 1);
                      }
                    "
                  ></code-block>
                </div>
                <!-- Tiptap içeriği -->
                <div v-if="item.type == 'tiptap'">
                  <tiptap
                    :_content="item"
                    v-on:delete_item="
                      () => {
                        chapter.descriptions.splice(index, 1);
                      }
                    "
                  ></tiptap>
                </div>
                <!-- Resim içeriği -->
                <div v-if="item.type == 'image'">
                  <image-block
                    :_content="item"
                    :_defaultImage="
                      defaultImages[
                        defaultImages.findIndex((x) => x.i == index)
                      ]
                    "
                    v-on:delete_item="
                      () => {
                        chapter.descriptions.splice(index, 1);
                      }
                    "
                  ></image-block>
                </div>
                <br />
              </div>
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
import { GET_API_CATEGORY } from "@/core/services/store/category.module";
export default {
  name: "AdminChapterEdit",
  components: {
    Preview: () => import("@/components/Preview"),
    Markdown: () => import("@/components/Markdown"),
    Tiptap: () => import("@/components/Tiptap"),
    CodeBlock: () => import("@/components/Code"),
    ImageBlock: () => import("@/components/Image"),
    UpdateAlert: () => import("@/components/Alert/UpdateAlert"),
    SubHeader: () => import("@/layouts/header/SubHeader"),
    SpeedDial: () => import(`@/components/SpeedDial.vue`),
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
        seo: {
          title: "",
          description: "",
        },
      },
      loading: true,
      categories: [],
      valueConsistsOf: "BRANCH_PRIORITY",
      htmlVision: false,
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
    if (
      !this.$store.getters.getCategory ||
      this.$store.getters.getCategory.type !== "chapter"
    )
      await this.$store.dispatch(GET_API_CATEGORY, "chapter");
    this.categories = this.$store.getters.getCategory.categories;
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