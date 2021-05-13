<template>
  <v-container>
    <sub-header>
      <template v-slot:buttons>
        <div style="width: 100%; text-align: right">
          <v-btn
            icon
            color="red"
            @click="$router.push({ path: '/admin/news' })"
          >
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-btn icon color="green" @click="save()">
            <v-icon>mdi-content-save-outline</v-icon>
          </v-btn>
        </div>
      </template>
    </sub-header>
    <v-row>
      <v-col md="3">
        <h2><v-icon>mdi-shape</v-icon> Kategori</h2>
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
        <h2><v-icon>mdi-book-open-page-variant</v-icon> Vitrin</h2>
        <v-treeview
          v-model="news.showcases"
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
                  tags.push({ key: '', tag: '' });
                }
              "
            >
              <v-icon> mdi-plus </v-icon>
            </v-btn>
          </template>
          <span>Etiket Ekle</span>
        </v-tooltip>
        <div v-for="(item, index) in tags" :key="item">
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
                    tags.splice(index, 1);
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
          prepend-inner-icon="mdi-format-title"
        ></v-text-field>
        <v-text-field
          v-model="news.short_description"
          label="Kısa Açıklama"
          placeholder="Kısa Açıklama"
          outlined
          dense
          prepend-inner-icon="mdi-subtitles-outline"
        ></v-text-field>
        <v-hover v-if="imageUrl" v-slot="{ hover }">
          <v-img :aspect-ratio="16 / 9" :src="imageUrl" max-width="500px">
            <v-fade-transition mode="out-in">
              <div v-if="hover" class="">
                <v-btn
                  @click="
                    () => {
                      imageUrl = null;
                      news.image_path = null;
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
          v-model="news.image_path"
          label="Resim Ekle"
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
              <div v-for="(item, index) in news.descriptions" :key="index">
                <!-- Markdown içeriği -->
                <div v-if="item.type == 'markdown'">
                  <markdown :_content="item" v-on:delete_item="() => {
                      news.descriptions.splice(index, 1)
                    }"></markdown>
                </div>
                <!-- Code editor içeriği -->
                <div v-if="item.type == 'code'">
                  <code-block :_code="item" v-on:delete_item="() => {
                      news.descriptions.splice(index, 1)
                    }"></code-block>
                </div>
                <!-- Tiptap içeriği -->
                <div v-if="item.type == 'tiptap'">
                  <tiptap :_content="item" v-on:delete_item="() => {
                      news.descriptions.splice(index, 1)
                    }"></tiptap>
                </div>
                <!-- Resim içeriği -->
                <div v-if="item.type == 'image'">
                  <image-block :_content="item" v-on:delete_item="() => {
                      news.descriptions.splice(index, 1)
                    }"></image-block>
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
                          width: 500
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
  </v-container>
</template>


<script>
import ApiService from "@/core/services/api.service.js";
import SubHeader from "@/layouts/header/SubHeader";
import jwt_decode from "jwt-decode";
var ObjectID = require("bson-objectid");
export default {
  name: "admin-news-create",
  components: {
    Preview: () => import("@/components/Preview"),
    Markdown: () => import("@/components/Markdown"),
    Tiptap: () => import("@/components/Tiptap"),
    CodeBlock: () => import("@/components/Code"),
    ImageBlock: () => import("@/components/Image"),
    SubHeader,
  },
  data() {
    return {
      drag: {
        col: 12,
      },
      selectionType: "leaf",
      selection: [],
      news: {
        descriptions: [],
      },
      loading: "block",
      categories: [],
      valueConsistsOf: "BRANCH_PRIORITY",
      tags: [],
      imageUrl: "",
      imageFile: "",
      imageName: "",
      preview: false,
    };
  },
  created() {
    ApiService.get(`newscategories/`).then((x) => {
      this.categories = x.data.map((x) => {
        return {
          id: x.id,
          label: x.label,
          children: x.children,
        };
      });
    });
  },
  methods: {
    reset() {
      this.news = {};
    },
    getFiles(files) {
      this.news.image_path = files.base64;
    },
    save() {
      var data = {
        ...this.news,
        tags: this.tags,
        image_path: this.imageUrl,
        user_id: ObjectID(jwt_decode(localStorage.getItem("id_token")).user_id),
        status: "ModeratorAcceping",
      };
      ApiService.post(`news/`, data).then((x) => {
        if (x.status == 201) {
          this.$router.push({ path: "/admin/news" });
        }
      });
    },
    onFilePicked() {
      const files = this.news.image_path;
      if (files !== undefined) {
        this.imageName = files.name;
        if (this.imageName.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files);
        fr.addEventListener("load", () => {
          this.imageUrl = fr.result;
          this.imageFile = files; // this is an image file that can be sent to server...
        });
      } else {
        this.imageName = "";
        this.imageFile = "";
        this.imageUrl = "";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>