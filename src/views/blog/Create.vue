<template>
  <v-container>
    <sub-header>
      <template v-slot:buttons>
        <div style="width: 100%; text-align: right">
          <v-btn icon color="red" @click="$router.push({ path: '/blog' })">
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
          return-object
          item-text="label"
          open-all
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
        <v-file-input
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
      blog: {},
      loading: "block",
      categories: [],
      valueConsistsOf: "BRANCH_PRIORITY",
    };
  },
  created() {
    ApiService.get(`blogcategories/`).then((x) => {
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
      ApiService.post(`blogs/`, data).then((x) => {
        if (x.status == 201) {
          this.$router.push({ path: "/blog" });
        }
      });
    },
    onFilePicked() {
      const files = this.blog.image_path;
      if (files !== undefined) {
        var imageName = files.name;
        if (imageName.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files);
        fr.addEventListener("load", () => {
          this.blog.image_path = fr.result;
        });
      } else {
        this.blog.image_path = "";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>