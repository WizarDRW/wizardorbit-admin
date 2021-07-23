<template>
  <div class="text-center">
    <v-dialog :persistent="loading" v-model="dialog" width="1000">
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
                ? $t('phrases.published')
                : _content.status == 'Block'
                ? $t('phrases.blocked')
                : $t('phrases.moderatorApproval')
            "
            >{{ $t("keywords.preview") }}
          </v-badge>
          <div v-else>{{ $t("keywords.preview") }}</div>
        </v-card-title>

        <slot>
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
            <div v-if="item.type == 'image'">
              <v-img :src="item.val"></v-img>
            </div>
          </div>
        </slot>
        <v-card-actions>
          <v-spacer></v-spacer>
          <slot name="buttons">
            <v-btn
              :disabled="loading"
              color="warning"
              text
              @click="dialog = false"
            >
              Kapat
            </v-btn>
            <div v-if="_created">
              <v-btn
                v-if="_content.status == 'Published'"
                :disabled="loading"
                color="error"
                text
                @click="handleProcess('Block')"
              >
                {{ $t("keywords.block") }}!
              </v-btn>
              <v-btn
                v-else-if="_content.status == 'Block'"
                :disabled="loading"
                color="success"
                text
                @click="handleProcess('Published')"
              >
                {{ $t("keywords.unblock") }}
              </v-btn>
              <v-btn
                v-else-if="_content.status == 'ModeratorAcceping'"
                :disabled="loading"
                color="success"
                text
                @click="handleProcess('Published')"
              >
                {{ $t("keywords.publish") }}
              </v-btn>
            </div>
          </slot>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>


<script>
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
      default: false,
    },
    _api: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      result: {
        status: false,
        msg: "Başarı ile değiştirildi.",
        type: "success",
      },
      proc: "",
      loading: false,
      interval: {},
    };
  },
  computed: {
    dialog: {
      get() {
        return this._dialog;
      },
      set(value) {
        clearInterval(this.interval);
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
    async handleProcess(value) {
      this.proc = value;
      var data = {
        ...this._content,
        status: value,
      };
      this.loading = true;
      var id = await this.$store.dispatch("update", {
        msg: data._id,
        func: this._api,
        item: data,
      });
      this.save(id);
    },
    save(id) {
      this.interval = setInterval(() => {
        if (
          this.$store.getters.getResultQueues.filter((x) => x.id == id).length > 0
        ) {
          this.$store.commit('destroyResultQueue', id);
          this._content.status = this.proc;
          this.loading = false;
          clearInterval(this.interval);
        }
      }, 1000);
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
.alerts {
  z-index: 999;
}
</style>