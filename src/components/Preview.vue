<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="1000">
      <v-card>
        <v-card-title class="headline dark lighten-2">
          <v-badge
            v-if="_created"
            :color="
              _content.status == 'Published'
                ? 'green'
                : _content.status == 'Block'
                ? 'red'
                : 'orange'
            "
            :content="
              _content.status == 'Published'
                ? 'Yayında'
                : _content.status == 'Block'
                ? 'Bloklandı'
                : 'Onay Bekliyor'
            "
            >Önizleme
          </v-badge>
          <div v-else>Önizleme</div>
        </v-card-title>

        <v-img v-if="_content.image_path" :src="_content.image_path"></v-img>
        <v-card-text></v-card-text>

        <v-divider></v-divider>
        <div
          class="preview"
          v-for="(item, index) in _content.descriptions"
          :key="index"
        >
          <div
            v-if="item.type == 'markdown'"
            v-katex
            v-html="compiledMarkdown(item)"
          ></div>
          <div v-if="item.type == 'code'">
            <code-block :_code="item" :_readonly="true"></code-block>
          </div>
          <div v-if="item.type == 'tiptap'">
            <div v-html="item.val"></div>
          </div>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <slot name="buttons">
            <v-btn color="warning" text @click="dialog = false"> Kapat </v-btn>
            <div v-if="_created">
              <v-btn
                v-if="_content.status == 'Published'"
                color="error"
                text
                @click="process('Block')"
              >
                Bloke Koy!
              </v-btn>
              <v-btn
                v-else-if="_content.status == 'Block'"
                color="success"
                text
                @click="process('Published')"
              >
                Bloke Kaldır
              </v-btn>
              <v-btn
                v-else-if="_content.status == 'ModeratorAcceping'"
                color="success"
                text
                @click="process('Published')"
              >
                Yayına Al
              </v-btn>
            </div>
          </slot>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>


<script>
import ApiService from "@/core/services/api.service.js";
import marked from "marked";
export default {
  components: {
    CodeBlock: () => import("./Code"),
  },
  props: {
    _dialog: {
      type: Boolean,
      default: false,
    },
    _name: {
      type: String,
      default: "",
    },
    _content: {
      type: Object,
      default: () => {},
    },
    _created: {
      type: Boolean,
      default: false
    },
    _apiurl: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      result: {
        status: false,
        msg: "Başarı ile değiştirildi.",
        type: "success",
      },
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
  beforeCreate() {
    import("mermaid").then((m) => {
      m.initialize({
        startOnLoad: true,
        theme: "dark",
      });
      m.init(".language-mermaid");
    });
  },
  methods: {
    compiledMarkdown(item) {
      return marked(item.val);
    },
    process(value) {
      this._content.status = value;
      ApiService.put(`${this._apiurl}/id/${this._content._id}`, this._content);
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
.preview {
  width: 100%;
  padding: 0 20px;
}
</style>