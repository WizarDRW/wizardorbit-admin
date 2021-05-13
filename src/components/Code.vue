<template>
  <div>
    <v-select
      v-if="!_readonly"
      :items="[
        { id: 'js', name: 'javascript' },
        { id: 'php', name: 'php' },
        { id: 'csharp', name: 'C#' },
        { id: 'cpp', name: 'C++' },
        { id: 'c', name: 'C' },
      ]"
      label="Dil Seç"
      solo
      v-model="_code.lang"
      dense
      item-text="name"
      hide-details
      return-object
      append-outer-icon="mdi-delete-variant"
      @click:append-outer="
        () => {
          $emit('delete_item');
        }
      "
    ></v-select>
    <prism-editor
      class="my-editor"
      v-model="_code.val"
      :highlight="highlighter"
      line-numbers
      :readonly="_readonly"
    ></prism-editor>
  </div>
</template>
 
<script>
import { PrismEditor } from "vue-prism-editor";
import "vue-prism-editor/dist/prismeditor.min.css";

import { highlight, languages } from "prismjs/components/prism-core";
import "@/utils/prismjs";
import "prismjs/themes/prism-tomorrow.css";

export default {
  components: {
    PrismEditor,
  },
  props: {
    _code: {
      type: Object,
      default: () => {},
    },
    _readonly: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    code: {},
    lang: { id: "js", name: "javascript" },
  }),
  created() {
    this.code = this._code;
  },
  methods: {
    highlighter(code) {
      return highlight(code, languages[this.lang.id]);
    },
  },
};
</script> 
 
<style>
.my-editor {
  background: #2d2d2d;
  color: #ccc;

  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px;
}

.prism-editor__textarea:focus {
  outline: none;
}
</style>