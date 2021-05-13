<template>
  <v-container fluid>
    <sub-header>
      <template v-slot:buttons>
        <div style="width: 100%; text-align: right">
          <v-btn icon color="red" @click="$router.push({ path: '/mylibrary' })">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-btn icon color="green" @click="save()">
            <v-icon>mdi-content-save-outline</v-icon>
          </v-btn>
        </div>
      </template>
    </sub-header>
    <v-row>
      <v-col cols="12" sm="6" md="3">
        <v-text-field
          v-model="library.name"
          label="Başlık"
          placeholder="Başlık"
          outlined
          dense
          prepend-icon="mdi-format-title"
        ></v-text-field>
        <v-text-field
          v-model="library.description"
          label="Açıklama"
          placeholder="Açıklama"
          outlined
          dense
          prepend-icon="mdi-subtitles-outline"
        ></v-text-field>
        <v-hover v-if="library.image_path" v-slot="{ hover }">
          <v-img
            :aspect-ratio="16 / 9"
            :src="library.image_path"
            max-width="500px"
          >
            <v-fade-transition mode="out-in">
              <div v-if="hover" class="">
                <v-btn
                  @click="
                    () => {
                      library.image_path = null;
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
          v-model="library.image_path"
          label="Resim Ekle"
          outlined
          dense
          hide-details
          ref="image"
          accept="image/*"
          @change="onFilePicked"
        ></v-file-input>
        <v-checkbox
          v-model="library.private"
          on-icon="mdi-lock-outline"
          off-icon="mdi-lock-open-variant-outline"
          :label="`${library.private ? 'Gizli' : 'Herkes'}`"
          dense
        >
        </v-checkbox>
      </v-col>
      <v-col cols="9">
        <skeleton-loader v-if="loading"></skeleton-loader>
        <v-row v-else dense>
          <v-col v-for="(item, index) in datas" :key="index" cols="12" sm="6" md="3">
            <v-card hover @click="addList(item)">
              <v-img
                class="white--text align-end"
                :gradient="
                  item.isAdd
                    ? `to bottom, rgba(0,0,0,.1), rgba(29, 145, 60, .5)`
                    : `to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)`
                "
                height="200px"
                :src="item.image_path"
              >
                <v-card-title>
                  <v-badge
                    inline
                    :color="
                      item.type == 'blogs'
                        ? 'green'
                        : item.type == 'news'
                        ? 'blue'
                        : 'red'
                    "
                    :content="item.type"
                  >
                    {{ item.name }}
                  </v-badge>
                </v-card-title>
              </v-img>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ApiService from "@/core/services/api.service.js";
var ObjectID = require("bson-objectid");
export default {
  name: "my-library-create",
  components: {
    SubHeader: () => import("@/layouts/header/SubHeader"),
    SkeletonLoader: () => import("@/components/SkeletonLoader"),
  },
  data() {
    return {
      library: {
        contents: [],
        private: false,
        user_id: ObjectID(this.$store.getters.currentUser._id),
      },
      datas: [],
      loading: true,
    };
  },
  async created() {
    const news = (
      await ApiService.get(`news/userid/${this.$store.getters.currentUser._id}`)
    ).data.map((x) => {
      return {
        ...x,
        type: "news",
        isAdd: false,
      };
    });
    const blogs = (
      await ApiService.get(
        `blogs/userid/${this.$store.getters.currentUser._id}`
      )
    ).data.map((x) => {
      return {
        ...x,
        type: "blogs",
        isAdd: false,
      };
    });
    this.datas = [...blogs, ...news];
    if (this.datas) {
      this.loading = false;
    }
  },
  methods: {
    addList(item) {
      if (!this.library.contents.includes(item._id)) {
        this.library.contents.push(item._id);
        item.isAdd = true;
      } else {
        this.library.contents.splice(this.library.contents.indexOf(item._id), 1);
        item.isAdd = false;
      }
    },
    save() {
      ApiService.post(`mylibraries/`, this.library).then((x) => {
        if (x.status == 201) {
          this.$router.push({ path: "/mylibrary" });
        }
      });
    },
    onFilePicked() {
      const files = this.library.image_path;
      if (files !== undefined) {
        if (files.name.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files);
        fr.addEventListener("load", () => {
          this.library.image_path = fr.result;
        });
      } else {
        this.library.image_path = "";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>