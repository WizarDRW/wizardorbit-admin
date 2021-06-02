<template>
  <v-container>
    <sub-header>
      <template v-slot:buttons>
        <div style="width: 100%; text-align: right">
          <v-btn :disabled="loading" icon color="red" @click="$router.push({ name: 'Chapter' })">
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
        <h2>Kategori</h2>
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
            max-width="500px"
          >
            <v-fade-transition mode="out-in">
              <div v-if="hover" class="">
                <v-btn
                  @click="
                    () => {
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
              <!-- Content ekleme butonu -->
              <v-menu offset-y>
                <template v-slot:activator="{ on: menu, attrs }">
                  <v-tooltip top>
                    <template v-slot:activator="{ on: tooltip }">
                      <v-btn icon v-bind="attrs" v-on="{ ...tooltip, ...menu }">
                        <v-icon> mdi-plus </v-icon>
                      </v-btn>
                    </template>
                    <span>Ekle</span>
                  </v-tooltip>
                </template>
                <v-list>
                  <v-list-item link>
                    <v-list-item-action
                      @click="
                        chapter.descriptions.push({
                          sort: chapter.descriptions.length - 1,
                          type: 'markdown',
                          val: '',
                        })
                      "
                    >
                      Markdown
                    </v-list-item-action>
                  </v-list-item>
                  <v-list-item link>
                    <v-list-item-action
                      @click="
                        chapter.descriptions.push({
                          sort: chapter.descriptions.length - 1,
                          type: 'code',
                          lang: { id: 'js', name: 'javascript' },
                          val: '',
                        })
                      "
                    >
                      Code
                    </v-list-item-action>
                  </v-list-item>
                  <v-list-item link>
                    <v-list-item-action
                      @click="
                        chapter.descriptions.push({
                          sort: chapter.descriptions.length - 1,
                          type: 'tiptap',
                          val: '',
                        })
                      "
                    >
                      Tiptap
                    </v-list-item-action>
                  </v-list-item>
                  <v-list-item link>
                    <v-list-item-action
                      @click="
                        chapter.descriptions.push({
                          sort: chapter.descriptions.length - 1,
                          type: 'image',
                          val: '',
                          width: 500,
                        })
                      "
                    >
                      Image
                    </v-list-item-action>
                  </v-list-item>
                </v-list>
              </v-menu>
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
  </v-container>
</template>


<script>
import { GET_API_CHAPTER } from "@/core/services/store/chapter.module";
import { GET_API_CATEGORY } from "@/core/services/store/category.module";
export default {
  name: "ChapterEdit",
  components: {
    Preview: () => import("@/components/Preview"),
    Markdown: () => import("@/components/Markdown"),
    Tiptap: () => import("@/components/Tiptap"),
    CodeBlock: () => import("@/components/Code"),
    ImageBlock: () => import("@/components/Image"),
    UpdateAlert: () => import("@/components/Alert/UpdateAlert"),
    SubHeader: () => import("@/layouts/header/SubHeader"),
  },
  data() {
    return {
      drag: {
        col: 12,
      },
      selectionType: "leaf",
      selection: [],
      chapter: {
        status: "ModeratorAcceping"
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
      this.loading = false;
      this.$router.push({ path: "/chapter" });
    },
    onFilePicked() {
      const files = this.chapter.image_path;
      if (files !== undefined) {
        if (files.name.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files);
        fr.addEventListener("load", () => {
          this.chapter.image_path = fr.result;
        });
      } else {
        this.chapter.image_path = "";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>