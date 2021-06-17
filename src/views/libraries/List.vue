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
                @click="$router.push({ path: '/library/new-book' })"
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
    <v-row v-else v-masonry>
      <v-col
        v-for="(item, index) in libraries"
        :key="index"
        cols="12"
        sm="6"
        md="3"
      >
        <v-card color="v_card_background">
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
                ...item.chapters.slice(0, 7),
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
          <div v-if="item.chapters.length > 0">
            <v-card-text>Bölümler</v-card-text>
            <v-row dense no-gutters>
              <v-col
                v-for="(content_item, content_index) in item.chapters.slice(
                  0,
                  7
                )"
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
          </div>
          <div v-if="item.news.length > 0">
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
          </div>
          <v-card-text> {{ item.description }} </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-tooltip color="blue" bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  color="primary"
                  icon
                  @click="content(item)"
                >
                  <v-icon>mdi-circle-edit-outline</v-icon>
                </v-btn>
              </template>
              <span> Düzenle </span>
            </v-tooltip>
            <v-tooltip color="red" bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  color="error"
                  icon
                  @click="
                    () => {
                      deleteDialog = true;
                      deleteRes.id = item._id;
                    }
                  "
                >
                  <v-icon>mdi-delete-outline</v-icon>
                </v-btn>
              </template>
              <span> Sil </span>
            </v-tooltip>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <delete
      :_dialog="deleteDialog"
      :_id="deleteRes.id"
      v-on:handleDelete="handleDelete"
      v-on:dialogClose="(value) => (deleteDialog = value)"
    ></delete>
    <div class="alerts">
      <delete-alert
        v-for="(item, index) in deleteItems"
        :key="index"
        v-model="item.status"
        :_msg="item.msg"
        :_type="item.type"
        :_second="item.second"
        :_alert="item.status"
        :_func="item.func"
        :_itemid="item.itemid"
        v-on:deleted="deleteProcess"
      ></delete-alert>
    </div>
  </v-container>
</template>

<script>
import {
  LIBRARY,
  GET_API_USER_LIBRARIES,
} from "@/core/services/store/library.module";
export default {
  name: "library-list",
  components: {
    SubHeader: () => import("@/layouts/header/SubHeader"),
    Delete: () => import("@/components/Delete"),
    DeleteAlert: () => import("@/components/Alert/DeleteAlert"),
  },
  data() {
    return {
      libraries: [],
      loading: {
        status: false,
        count: 1,
      },
      deleteDialog: false,
      deleteRes: {
        name: "",
        id: "",
      },
      deleteItems: [],
    };
  },
  async mounted() {
    this.loading.status = true;
    if (!this.$store.getters.getUserLibraries)
      await this.$store.dispatch(
        GET_API_USER_LIBRARIES,
        this.$store.getters.currentUser._id
      );
    this.libraries = this.$store.getters.getUserLibraries;
    if (this.libraries) this.loading.status = false;
  },
  methods: {
    getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    },
    content(item) {
      this.$store.dispatch(LIBRARY, item);
      this.$router.push({ path: `/library/content/${item._id}` });
    },
    handleDelete(itemid) {
      this.deleteItems.push({
        msg: "Silinme işlemi için",
        type: "error",
        func: "deleteApiLibrary",
        second: 100,
        status: true,
        itemid: itemid,
      });
    },
    deleteProcess() {
      var count = 0;
      this.deleteItems.forEach((el) => {
        count += el.status ? 0 : 1;
      });
      if (count == this.deleteItems.length) {
        this.deleteItems = [];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.alerts {
  position: fixed !important;
  bottom: 10px;
  right: 10px;
}
</style>