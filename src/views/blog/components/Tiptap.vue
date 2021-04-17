<template>
  <tiptap-vuetify
    v-model="_content.description"
    placeholder="Yazınız…"
    :extensions="extensions"
    :toolbar-attributes="{ color: 'black' }"
  >
  </tiptap-vuetify>
</template>

<script>
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  CodeBlock,
  Paragraph,
  Image,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History,
} from "tiptap-vuetify";
export default {
  components: {
    TiptapVuetify,
  },
  props: {
    _content: {
      type: Object
    },
  },
  data() {
    return {
      // declare extensions you want to use
      extensions: [
        History,
        Blockquote,
        Link,
        Underline,
        Strike,
        Italic,
        Image,
        ListItem,
        BulletList,
        OrderedList,
        [
          Heading,
          {
            options: {
              levels: [1, 2, 3],
            },
          },
        ],
        Bold,
        CodeBlock,
        HorizontalRule,
        Paragraph,
        HardBreak,
      ],
    };
  },
  watch: {
  },
};
</script>

<style lang="scss" scoped>
</style>