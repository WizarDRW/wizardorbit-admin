<template>
  <v-container>
    <sub-header>
      <template v-slot:buttons>
        <div style="width: 100%; text-align: right">
          <v-tooltip color="green" bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
                color="green"
                @click="$router.push({ path: '/mylibrary/new-shelve' })"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <span>Yeni Kitaplık Oluştur</span>
          </v-tooltip>
        </div>
      </template>
    </sub-header>
    <v-row v-if="loading.status">
      <v-col v-for="(x, i) in loading.count" :key="i" cols="3">
        <v-skeleton-loader
          type="card-avatar, article, actions"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="(item, index) in libraries" :key="index" cols="3">
        <v-card @click="$router.push({ path: '/mylibrary/content' })">
          <v-carousel
            vertical
            touchless
            cycle
            :show-arrows="false"
            hide-delimiters
            hide-delimiter-background
            show-arrows-on-hover
            delimiter-icon="mdi-minus"
            height="auto"
            :interval="getRandomArbitrary(4000, 10000)"
          >
            <v-carousel-item
              v-for="(content_item, content_index) in [
                ...item.blogs.slice(0, 7),
                ...item.news.slice(0, 7),
              ]"
              :key="content_index"
            >
              <v-img
                aspect-ratio="2"
                gradient="to top, rgba(0,0,0,0), rgba(0,0,0,0.3)"
                :src="content_item.image_path"
              >
                <v-card-title> {{ content_item.name }} </v-card-title>
              </v-img>
            </v-carousel-item>
          </v-carousel>
          <v-card-title> {{ item.name }} </v-card-title>
          <v-card-text>Bloglar</v-card-text>
          <v-row dense no-gutters>
            <v-col
              v-for="(content_item, content_index) in item.blogs.slice(0, 7)"
              :key="content_index"
              cols="3"
            >
              <v-tooltip color="green" bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-card tile v-bind="attrs" v-on="on">
                    <v-img
                      aspect-ratio="2"
                      :src="content_item.image_path"
                    ></v-img>
                  </v-card>
                </template>
                <span> {{ content_item.name }} </span>
              </v-tooltip>
            </v-col>
          </v-row>
          <v-card-text>Haberler</v-card-text>
          <v-row dense no-gutters>
            <v-col
              v-for="(content_item, content_index) in item.news.slice(0, 7)"
              :key="content_index"
              cols="3"
            >
              <v-tooltip color="blue" bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-card tile v-bind="attrs" v-on="on">
                    <v-img
                      aspect-ratio="2"
                      :src="content_item.image_path"
                    ></v-img>
                  </v-card>
                </template>
                <span> {{ content_item.name }} </span>
              </v-tooltip>
            </v-col>
          </v-row>
          <v-card-text>
            {{ item.description }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ApiService from "@/core/services/api.service.js";
export default {
  name: "my-library-list",
  components: {
    SubHeader: () => import("@/layouts/header/SubHeader"),
  },
  data() {
    return {
      libraries: [],
      loading: {
        status: false,
        count: 4,
      },
    };
  },
  async mounted() {
    this.loading.status = true;
    this.libraries = (
      await ApiService.get(
        `mylibraries/userid/${this.$store.getters.currentUser._id}`
      )
    ).data;
    if (this.libraries) this.loading.status = false;
  },
  methods: {
    getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>