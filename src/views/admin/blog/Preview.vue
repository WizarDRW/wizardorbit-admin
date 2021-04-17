<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="1000">
      <v-card>
        <v-card-title class="headline dark lighten-2">
          <v-badge
            :color="
              blog.status == 'Published'
                ? 'green'
                : blog.status == 'Block'
                ? 'red'
                : 'orange'
            "
            :content="
              blog.status == 'Published'
                ? 'Yayında'
                : blog.status == 'Block'
                ? 'Bloklandı'
                : 'Onay Bekliyor'
            "
            >Önizleme
          </v-badge></v-card-title
        >

        <v-img :src="blog.image_path"></v-img>
        <v-card-text></v-card-text>

        <v-divider></v-divider>
        <div v-html="blog.description"></div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <slot name="buttons">
            <v-btn color="warning" text @click="dialog = false"> Kapat </v-btn>

            <v-btn
              v-if="blog.status == 'Published'"
              color="error"
              text
              @click="process('Block')"
            >
              Bloke Koy!
            </v-btn>
            <v-btn
              v-else-if="blog.status == 'Block'"
              color="success"
              text
              @click="process('Published')"
            >
              Bloke Kaldır
            </v-btn>
            <v-btn
              v-else-if="blog.status == 'ModeratorAcceping'"
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
    _blog: {
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
      blog: {}
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
    this.blog = this._blog
  },
  methods: {
    process(value) {
      this.blog.status = value;
      ApiService.put(`blogs/id/${this.blog._id}`, this.blog)
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