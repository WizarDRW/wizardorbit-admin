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
                ? 'Yayında'
                : _content.status == 'Block'
                ? 'Bloklandı'
                : 'Onay Bekliyor'
            "
            >Önizleme
          </v-badge>
          <div v-else>Önizleme</div>
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
            <v-btn :disabled="loading" color="warning" text @click="dialog = false"> Kapat </v-btn>
            <div v-if="_created">
              <v-btn
                v-if="_content.status == 'Published'"
                :disabled="loading"
                color="error"
                text
                @click="handleProcess('Block')"
              >
                Bloke Koy!
              </v-btn>
              <v-btn
                v-else-if="_content.status == 'Block'"
                :disabled="loading"
                color="success"
                text
                @click="handleProcess('Published')"
              >
                Bloke Kaldır
              </v-btn>
              <v-btn
                v-else-if="_content.status == 'ModeratorAcceping'"
                :disabled="loading"
                color="success"
                text
                @click="handleProcess('Published')"
              >
                Yayına Al
              </v-btn>
            </div>
          </slot>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div class="alerts">
      <update-alert
        v-if="update.status"
        v-on:input="
          (val) => {
            loading = val;
            update.status = val;
          }
        "
        :_msg="update.msg"
        :_type="update.type"
        :_second="update.second"
        :_alert="update.status"
        :_func="update.func"
        :_item="update.item"
        v-on:updated="save"
      ></update-alert>
    </div>
  </div>
</template>


<script>
import ApiService from "@/core/services/api.service.js";
import marked from "marked";
export default {
  components: {
    CodeBlock: () => import("./Code"),
    UpdateAlert: () => import("./Alert/UpdateAlert"),
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
      update: {
        status: false,
        msg: "İşlem yaklaşık 10sn içinde gerçekleşecektir.",
        second: 100,
        type: "warning",
        func: "",
        item: {},
      },
      proc: "",
      loading: false
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
    handleProcess(value) {
      this.proc = value;
      var data = {
        ...this._content,
        status: value,
      };
      this.loading = true;
      this.update.item = data;
      this.update.second = 100;
      this.update.func = this._api;
      this.update.status = true;
    },
    async save() {
      this._content.status = this.proc;
      this.loading = false;
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
.alerts{
  z-index: 999;
}
</style>