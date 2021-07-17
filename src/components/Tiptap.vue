<template>
  <div>
    <slot v-bind:extensions="extensions">
      <tiptap-vuetify
        v-model="_content.val"
        :placeholder="`${$t('keywords.write')}…`"
        :extensions="extensions"
        :toolbar-attributes="{ color: 'black' }"
      >
        <template #toolbar-after>
          <div class="delete-btn">
            <v-btn
              @click="
                () => {
                  $emit('delete_item');
                }
              "
              icon
              ><v-icon>mdi-delete-variant</v-icon></v-btn
            >
          </div>
        </template>
      </tiptap-vuetify>
    </slot>
  </div>
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
      type: Object,
      default: () => {
        return { val: "" };
      },
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
};
</script>

<style scoped>
.delete-btn {
  float: right;
}
</style>