<template>
  <v-container>
    <sub-header :edit_title="library.name">
      <template #buttons>
        <div style="width: 100%; text-align: right">
          <v-btn icon color="red" @click="$router.push({ path: '/mylibrary' })">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-btn
            icon
            color="blue"
            @click="edit()"
          >
            <v-icon>mdi-circle-edit-outline</v-icon>
          </v-btn>
        </div>
      </template>
    </sub-header>
    <v-card class="item-col">
      <v-img
        gradient="to top, rgba(0,0,0,.2), rgba(0,0,0,.2)"
        aspect-ratio="10"
        :src="
          library.image_path
            ? library.image_path
            : 'https://cdn.vuetifyjs.com/images/parallax/material2.jpg'
        "
      >
        <v-card-title>{{ library.name }}</v-card-title>
        <v-card-text> {{ library.description }} </v-card-text>
      </v-img>
    </v-card>
    <v-row v-masonry>
      <v-col v-for="(item, index) in library.chapters" :key="index" md="4">
        <v-card @click="chapter(item)">
          <v-img
            aspect-ratio="2"
            :src="item.image_path"
          >
          </v-img>
          <v-card-title> {{ item.name }} </v-card-title>
          <v-card-subtitle> {{ item.short_description }} </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
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
      await this.$store.dispatch("getApiLibrary", this.$route.params.id);
    }
    this.library = this.$store.getters.getLibrary;
  },
  methods: {
    chapter(item) {
      this.$store.dispatch('chapter', item);
      this.$router.push({ name: `EditChapter`, params: { id: item._id } });
    },
    edit(){
      this.$store.dispatch("library", this.library);
      this.$router.push({ path: `/library/edit/${this.library._id}` })
    }
  },
};
</script>

<style scoped>
.item-col {
  margin-bottom: 20px;
}
</style>