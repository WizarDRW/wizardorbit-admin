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
                @click="$router.push({ path: '/admin/chapter' })"
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
        <div v-for="(item, index) in chapter.tags" :key="index">
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
          prepend-icon="mdi-format-title"
        ></v-text-field>
        <v-text-field
          v-model="chapter.short_description"
          label="Kısa Açıklama"
          placeholder="Kısa Açıklama"
          outlined
          dense
          prepend-icon="mdi-subtitles-outline"
        ></v-text-field>
        <v-hover v-if="chapter.image_path" v-slot="{ hover }">
          <v-img
            :aspect-ratio="16 / 9"
            :src="chapter.image_path"
            lazy-src="https://drive.google.com/uc?export=view&id=1K9QSSEMfJ4uTvixQKGDI9EDqUk_F4MjW"
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
                      $store.dispatch('deleteApiMultipart', chapter.image_path);
                      chapter.image_path = null;
                    }
                  "
                  tile
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
          label="Başlık Resimi Ekle"
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
                <!-- Markdown içeriği -->
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
        :_item="chapter"
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
      :_contents="chapter.descriptions"
    >
    </speed-dial>
  </v-container>
</template>


<script>
import { GET_API_CATEGORY } from "@/core/services/store/category.module";
var ObjectID = require("bson-objectid");
export default {
  name: "AdminChapterCreate",
  components: {
    Preview: () => import("@/components/Preview"),
    Markdown: () => import("@/components/Markdown"),
    Tiptap: () => import("@/components/Tiptap"),
    CodeBlock: () => import("@/components/Code"),
    ImageBlock: () => import("@/components/Image"),
    AddAlert: () => import("@/components/Alert/AddAlert"),
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
        descriptions: [],
        image_path: null,
        tags: [],
        status: "ModeratorAcceping",
        user_id: ObjectID(this.$store.getters.currentUser._id),
      },
      loading: false,
      categories: [],
      valueConsistsOf: "BRANCH_PRIORITY",
      imageUrl: "",
      htmlVision: false,
      preview: false,
      add: {
        status: false,
        msg: "Ekleme işlemi yaklaşık 5sn içinde gerçekleşecektir.",
        second: 100,
        type: "warning",
        func: "postApiChapter",
        item: {},
      },
      imageFile: null,
      isSave: false,
    };
  },
  async created() {
    if (
      !this.$store.getters.getCategory ||
      this.$store.getters.getCategory.type !== "chapter"
    )
      await this.$store.dispatch(GET_API_CATEGORY, "chapter");
    this.categories = this.$store.getters.getCategory.categories;
  },
  methods: {
    reset() {
      this.chapter = {};
    },
    getFiles(files) {
      this.chapter.image_path = files.base64;
    },
    handleSave() {
      this.loading = true;
      this.add.item = this.chapter;
      this.add.second = 100;
      this.add.status = true;
    },
    async save() {
      this.isSave = true;
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
      var data = {
        user_id: ObjectID(this.$store.getters.currentUser._id),
        type: "chapter",
        data: this.chapter,
      };
      this.$store.dispatch("postApiDraft", data);
    }
  },
};
</script>

<style lang="scss" scoped>
</style>