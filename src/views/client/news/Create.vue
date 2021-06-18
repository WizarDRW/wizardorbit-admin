<template>
  <v-container>
    <sub-header>
      <template v-slot:buttons>
        <div style="width: 100%; text-align: right">
          <v-btn
            :disabled="loading"
            icon
            color="red"
            @click="$router.push({ name: 'News' })"
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
        <h2>Kategori</h2>
        <v-treeview
          v-model="news.categories"
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
          v-model="news.name"
          label="Başlık"
          placeholder="Başlık"
          outlined
          dense
          disabled
          prepend-inner-icon="mdi-format-title"
        ></v-text-field>
        <v-text-field
          v-model="news.short_description"
          label="Açıklama"
          placeholder="Açıklama"
          outlined
          dense
          hide-details
          disabled
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
                  news.tags.push({ key: '', tag: '' });
                }
              "
            >
              <v-icon> mdi-plus </v-icon>
            </v-btn>
          </template>
          <span>Etiket Ekle</span>
        </v-tooltip>
        <div v-for="(item, index) in news.tags" :key="index">
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
                    news.tags.splice(index, 1);
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
          v-model="news.name"
          label="Başlık"
          placeholder="Başlık"
          outlined
          dense
          prepend-icon="mdi-format-title"
        ></v-text-field>
        <v-text-field
          v-model="news.short_description"
          label="Kısa Açıklama"
          placeholder="Kısa Açıklama"
          outlined
          dense
          prepend-icon="mdi-subtitles-outline"
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
                Yükleniyor...
              </v-row>
            </template>
            <v-fade-transition mode="out-in">
              <div v-if="hover" class="">
                <v-btn
                  @click="
                    () => {
                      $store.dispatch(
                        'deleteApiMultipart',
                        chapter.image_path
                      );
                      news.image_path = null;
                    }
                  "
                  color="red"
                  tile
                  >Sil</v-btn
                >
              </div>
            </v-fade-transition>
          </v-img>
        </v-hover>
        <v-file-input
          v-else
          v-model="news.image_path"
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
              <div v-for="(item, index) in news.descriptions" :key="index">
                <!-- Markdown içeriği -->
                <div v-if="item.type == 'markdown'">
                  <markdown
                    :_content="item"
                    v-on:delete_item="
                      () => {
                        news.descriptions.splice(index, 1);
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
                        news.descriptions.splice(index, 1);
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
                        news.descriptions.splice(index, 1);
                      }
                    "
                  ></tiptap>
                </div>
                <!-- Image içeriği -->
                <div v-if="item.type == 'image'">
                  <image-block
                    :_content="item"
                    v-on:delete_item="
                      () => {
                        news.descriptions.splice(index, 1);
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
                        news.descriptions.push({
                          sort: news.descriptions.length - 1,
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
                        news.descriptions.push({
                          sort: news.descriptions.length - 1,
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
                        news.descriptions.push({
                          sort: news.descriptions.length - 1,
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
                        news.descriptions.push({
                          sort: news.descriptions.length - 1,
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
import { GET_API_CATEGORY } from "@/core/services/store/category.module";
export default {
  name: "NewsCreate",
  components: {
    Preview: () => import("@/components/Preview"),
    Markdown: () => import("@/components/Markdown"),
    Tiptap: () => import("@/components/Tiptap"),
    CodeBlock: () => import("@/components/Code"),
    ImageBlock: () => import("@/components/Image"),
    AddAlert: () => import("@/components/Alert/AddAlert"),
    SubHeader: () => import("@/layouts/header/SubHeader"),
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
        user_id: this.$store.getters.currentUser._id,
        status: "ModeratorAcceping",
        descriptions: [],
        tags: [],
      },
      loading: true,
      categories: [],
      valueConsistsOf: "BRANCH_PRIORITY",
      tags: [],
      preview: false,
      add: {
        status: false,
        msg: "Ekleme işlemi yaklaşık 5sn içinde gerçekleşecektir.",
        second: 100,
        type: "warning",
        func: "postApiNews",
        item: {},
      },
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
      this.add.second = 100;
      this.add.status = true;
    },
    async save() {
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
};
</script>

<style lang="scss" scoped>
</style>