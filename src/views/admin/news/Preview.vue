<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="1000">
      <v-card>
        <v-card-title class="headline dark lighten-2">
          <v-badge
            :color="
              news.status == 'Published'
                ? 'green'
                : news.status == 'Block'
                ? 'red'
                : 'orange'
            "
            :content="
              news.status == 'Published'
                ? 'Yayında'
                : news.status == 'Block'
                ? 'Bloklandı'
                : 'Onay Bekliyor'
            "
            >Önizleme
          </v-badge></v-card-title
        >

        <v-img :src="news.image_path"></v-img>
        <v-card-text></v-card-text>

        <v-divider></v-divider>
        <div v-html="news.description"></div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <slot name="buttons">
            <v-btn color="warning" text @click="dialog = false"> Kapat </v-btn>

            <v-btn
              v-if="news.status == 'Published'"
              color="error"
              text
              @click="process('Block')"
            >
              Bloke Koy!
            </v-btn>
            <v-btn
              v-else-if="news.status == 'Block'"
              color="success"
              text
              @click="process('Published')"
            >
              Bloke Kaldır
            </v-btn>
            <v-btn
              v-else-if="news.status == 'ModeratorAcceping'"
              color="success"
              text
              @click="process('Published')"
            >
              Yayına Al
            </v-btn>
          </slot>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>


<script>
import ApiService from "@/core/services/api.service.js";
export default {
  props: {
    _dialog: {
      type: Boolean,
      default: false,
    },
    _name: {
      type: String,
      default: "",
    },
    _news: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      result: {
        status: false,
        msg: "Başarı ile değiştirildi.",
        type: "success",
      },
      news: {},
    };
  },
  computed: {
    dialog: {
      get() {
        return this._dialog;
      },
      set(value) {
        this.$emit("dialogClose", value);
      },
    },
  },
  updated() {
    this.news = this._news
  },
  methods: {
    process(value) {
      this.news.status = value;
      ApiService.put(`news/id/${this.news._id}`, this.news);
    },
  },
};
</script>

<style lang="css">
.alert {
  position: absolute;
  right: 5px;
  top: 5px;
  z-index: 999;
}
</style>