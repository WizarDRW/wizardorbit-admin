<template>
  <v-container>
    <sub-header>
      <template #buttons>
        <div style="width: 100%; text-align: right">
          <v-btn icon color="red" @click="$router.push({ path: '/mylibrary' })">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-btn icon color="blue" @click="$router.push({path: `/mylibrary/edit/${library._id}`})">
            <v-icon>mdi-circle-edit-outline</v-icon>
          </v-btn>
        </div>
      </template>
    </sub-header>
    <v-card class="item-col">
      <v-img
        gradient="to top, rgba(0,0,0,.2), rgba(0,0,0,.2)"
        aspect-ratio="10"
        :src="library.image_path ? library.image_path:'https://cdn.vuetifyjs.com/images/parallax/material2.jpg'"
      >
        <v-card-title>{{ library.name }}</v-card-title>
        <v-card-text> {{ library.description }} </v-card-text>
      </v-img>
    </v-card>
    <v-row>
      <v-col v-for="(item, index) in library.blogs" :key="index" md="4">
        <v-card @click="blog(item)">
          <v-img
            gradient="to top, rgba(0,0,0,.2), rgba(0,0,0,.2)"
            aspect-ratio="2"
            :src="item.image_path"
          >
            <v-card-text> {{ item.name }} </v-card-text>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { GET_API_LIBRARY } from "@/core/services/store/library.module";
import { BLOG } from "@/core/services/store/blog.module";
export default {
  components: {
    SubHeader: () => import("@/layouts/header/SubHeader"),
  },
  data() {
    return {
      library: {},
    };
  },
  async created() {
    if (!this.$store.getters.getLibrary) {
      await this.$store.dispatch(GET_API_LIBRARY, this.$route.params.id);
    }
    this.library = this.$store.getters.getLibrary;
  },
  methods: {
    blog(item) {
      this.$store.dispatch(BLOG, item)
      this.$router.push({path:`/blog/edit/${item._id}`})
    }
  },
};
</script>

<style lang="scss" scoped>
.item-col {
  margin-bottom: 20px;
}
</style>