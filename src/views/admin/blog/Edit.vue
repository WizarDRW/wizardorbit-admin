<template>
  <v-container>
    <sub-header>
      <template v-slot:buttons>
        <div style="width: 100%; text-align: right">
          <v-btn icon color="red" @click="$router.push({ path: '/admin/myblogs' })">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-btn icon color="green" @click="save()">
            <v-icon>mdi-content-save-outline</v-icon>
          </v-btn>
        </div>
      </template>
    </sub-header>
    <v-row>
      <v-col cols="3">
        <h2>Kategori</h2>
        <v-treeview
          v-model="blog.categories"
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
        <h2>SEO</h2>
        <v-text-field
          v-model="blog.name"
          label="Başlık"
          placeholder="Başlık"
          outlined
          dense
          disabled
          prepend-icon="mdi-format-title"
        ></v-text-field>
        <v-text-field
          v-model="blog.short_description"
          label="Açıklama"
          placeholder="Açıklama"
          outlined
          dense
          disabled
          prepend-icon="mdi-card-text-outline"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          v-model="blog.name"
          label="Başlık"
          placeholder="Başlık"
          outlined
          dense
          prepend-icon="mdi-format-title"
        ></v-text-field>
        <v-text-field
          v-model="blog.short_description"
          label="Kısa Açıklama"
          placeholder="Kısa Açıklama"
          outlined
          dense
          prepend-icon="mdi-subtitles-outline"
        ></v-text-field>
        <v-hover v-if="blog.image_path" v-slot="{ hover }">
          <v-img
            :aspect-ratio="16 / 9"
            :src="blog.image_path"
            max-width="500px"
          >
            <v-fade-transition mode="out-in">
              <div v-if="hover" class="">
                <v-btn
                  @click="
                    () => {
                      blog.image_path = null;
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
          v-model="blog.image_path"
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
              <v-card> <tiptap :_content="blog" /> </v-card>
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
  name: "Breadcrumbs",
  components: {
    Tiptap: () => import("./components/Tiptap"),
    SubHeader,
  },
  data() {
    return {
      drag: {
        col: 12,
      },
      selectionType: "leaf",
      selection: [],
      blog: {
        seo: {
          title: "",
          description: "",
        },
      },
      loading: "block",
      categories: [],
      valueConsistsOf: "BRANCH_PRIORITY",
      draggableCards: null,
    };
  },
  mounted() {
    ApiService.get(`blogcategories/`).then((x) => {
      this.getBlog();
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
    getBlog() {
      ApiService.get(`blogs/id/${this.$route.params.id}`).then((x) => {
        this.blog = { ...x.data, ...this.blog };
        this.loading = "none";
      });
    },
    reset() {
      this.blog = {};
    },
    getFiles(files) {
      this.blog.image_path = files.base64;
    },
    save() {
      var data = {
        ...this.blog,
        user_id: ObjectID(jwt_decode(localStorage.getItem("id_token")).user_id),
        status: "ModeratorAcceping",
      };
      ApiService.put(`blogs/id/${data._id}`, data).then((x) => {
        if (x.status == 200) {
          this.$router.push({ path: "/admin/blog" });
        }
      });
    },
    onFilePicked() {
      const files = this.blog.image_path;
      if (files !== undefined) {
        this.imageName = files.name;
        if (this.imageName.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files);
        fr.addEventListener("load", () => {
          this.blog.image_path = fr.result;
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