<template>
  <v-container fluid>
    <sub-header>
      <template v-slot:buttons>
        <div style="width: 100%; text-align: right">
          <v-btn icon color="red" @click="$router.push({ path: '/library' })">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-btn :loading="loading" icon color="green" @click="handleSave()">
            <v-icon>mdi-content-save-outline</v-icon>
          </v-btn>
        </div>
      </template>
    </sub-header>
    <v-row>
      <v-col cols="12" sm="6" md="3">
        <v-text-field
          v-model="library.name"
          :label="$t('keywords.title')"
          :placeholder="$t('keywords.title')"
          outlined
          dense
          prepend-icon="mdi-format-title"
        ></v-text-field>
        <v-text-field
          v-model="library.description"
          :label="$t('keywords.description')"
          :placeholder="$t('keywords.description')"
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
                  >{{ $t("keywords.delete") }}</v-btn
                >
              </div>
            </v-fade-transition>
          </v-img>
        </v-hover>
        <v-file-input
          v-else
          v-model="library.image_path"
          :label="$t('phrases.addImage')"
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
          :label="`${
            library.private ? $t('keywords.private') : $t('keywords.public')
          }`"
          dense
        >
        </v-checkbox>
      </v-col>
      <v-col cols="9">
        <skeleton-loader v-if="loading"></skeleton-loader>
        <v-item-group v-else v-model="model" multiple>
          <v-row no-gutters v-masonry>
            <v-col
              v-for="(item, index) in datas"
              :key="index"
              cols="12"
              sm="4"
              md="3"
              lg="3"
              xl="2"
            >
              <v-item v-slot="{ active, toggle }">
                <v-card
                  :color="active ? 'success' : ''"
                  class="ma-4"
                  @click="toggle"
                >
                  <v-img
                    class="white--text align-end"
                    :gradient="
                      active
                        ? `to bottom, rgba(0,0,0,.1), rgba(29, 145, 60, .5)`
                        : `to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)`
                    "
                    height="200px"
                    :src="item.image_path"
                  >
                  </v-img>
                  <v-card-title>
                    {{ item.name }}
                  </v-card-title>
                </v-card>
              </v-item>
            </v-col>
          </v-row>
        </v-item-group>
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
import { GET_API_USER_THE_NEWS } from "../../core/services/store/news.module";
import { GET_API_USER_CHAPTERS } from "../../core/services/store/chapter.module";
var ObjectID = require("bson-objectid");
export default {
  name: "my-library-create",
  components: {
    SubHeader: () => import("@/layouts/header/SubHeader"),
    SkeletonLoader: () => import("@/components/SkeletonLoader"),
    AddAlert: () => import("@/components/Alert/AddAlert"),
  },
  data() {
    return {
      library: {
        contents: [],
        private: false,
        user_id: this.$store.getters.currentUser._id,
      },
      datas: [],
      loading: true,
      model: null,
      add: {
        status: false,
        msg: null,
        second: 100,
        type: "warning",
        func: "postApiLibrary",
        item: {},
      },
      isSave: false,
      draftid: null,
      disable: true,
    };
  },
  async created() {
    if (!this.$store.getters.getUserChapters)
      await this.$store.dispatch(
        GET_API_USER_CHAPTERS,
        this.$store.getters.currentUser._id
      );
    const chapters = this.$store.getters.getUserChapters.map((x) => {
      return {
        ...x,
        type: "chapters",
        isAdd: false,
      };
    });
    if (!this.$store.getters.getUserTheNews)
      await this.$store.dispatch(
        GET_API_USER_THE_NEWS,
        this.$store.getters.currentUser._id
      );
    const news = this.$store.getters.getUserTheNews.map((x) => {
      return {
        ...x,
        type: "news",
        isAdd: false,
      };
    });
    this.datas = [...chapters, ...news];
    if (this.datas) {
      this.loading = false;
    }
    if (this.$route.params.draftid) {
      this.draftid = this.$route.params.draftid;
      if (!this.$store.getters.getDraft)
        await this.$store.dispatch("getApiDraft", this.draftid);
      this.library = this.$store.getters.getDraft.data;
    }
  },
  methods: {
    handleSave() {
      this.loading = true;
      this.add.item = this.library;
      this.add.msg = this.library.name;
      this.add.second = 100;
      this.add.status = true;
    },
    async save() {
      if (this.draftid) this.$store.dispatch("deleteApiDraft", this.draftid);
      this.isSave = true;
      this.$router.push({ name: "Library" });
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
  watch: {
    model(val) {
      this.library.contents = [];
      val.forEach((el) => {
        this.library.contents.push(this.datas[el]._id);
      });
    },
  },
  destroyed() {
    if (this.draftid) {
      this.$store.getters.getDraft.data = this.library;
      this.$store.dispatch("putApiDraft", this.$store.getters.getDraft);
    } else if (!this.isSave) {
      var data = {
        user_id: ObjectID(this.$store.getters.currentUser._id),
        type: "book",
        data: this.library,
      };
      this.$store.dispatch("postApiDraft", data);
    }
  },
};
</script>

<style lang="scss" scoped>
</style>