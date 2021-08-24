<template>
  <v-container>
    <!-- İçerikler -->
    <div v-for="(item, index) in _descriptions" :key="index">
      <!-- Card Title -->
      <div v-if="item.type == 'v-card-title'">
        <v-text-field
          v-model="item.val"
          :label="$t('phrases.card_title')"
          :placeholder="$t('phrases.card_title')"
          :rules="[$rule.required, $rule.min(item.val, 5)]"
          append-icon="mdi-delete-variant"
          @click:append="
            () => {
              _descriptions.splice(index, 1);
            }
          "
          solo
        >
          <template #message="{ message }">
            {{ $t(message, { n: 5 }) }}
          </template>
        </v-text-field>
      </div>
      <!-- Card Subtitle -->
      <div v-if="item.type == 'v-card-subtitle'">
        <v-text-field
          v-model="item.val"
          :label="$t('phrases.card_subtitle')"
          :placeholder="$t('phrases.card_subtitle')"
          :rules="[$rule.required, $rule.min(item.val, 5)]"
          append-icon="mdi-delete-variant"
          @click:append="
            () => {
              _descriptions.splice(index, 1);
            }
          "
          solo
        >
          <template #message="{ message }">
            {{ $t(message, { n: 5 }) }}
          </template>
        </v-text-field>
      </div>
      <!-- Card Text -->
      <div v-if="item.type == 'v-card-text'">
        <v-textarea
          v-model="item.val"
          :label="$t('phrases.card_text')"
          :placeholder="$t('phrases.card_text')"
          :rules="[$rule.required, $rule.min(item.val, 5)]"
          append-icon="mdi-delete-variant"
          @click:append="
            () => {
              _descriptions.splice(index, 1);
            }
          "
          solo
        >
          <template #message="{ message }">
            {{ $t(message, { n: 5 }) }}
          </template>
        </v-textarea>
      </div>
      <!-- Markdown üst butonları -->
      <div v-if="item.type == 'markdown'">
        <markdown
          :_content="item"
          v-on:delete_item="
            () => {
              _descriptions.splice(index, 1);
            }
          "
        ></markdown>
      </div>
      <!-- Code editor içeriği -->
      <div v-if="item.type == 'code'">
        <code-block
          :_code="item"
          v-on:delete_item="
            () => {
              _descriptions.splice(index, 1);
            }
          "
        ></code-block>
      </div>
      <!-- Tiptap içeriği -->
      <div v-if="item.type == 'tiptap'">
        <tiptap
          :_content="item"
          v-on:delete_item="
            () => {
              _descriptions.splice(index, 1);
            }
          "
        ></tiptap>
      </div>
      <!-- Resim içeriği -->
      <div v-if="item.type == 'image'">
        <image-block
          :_content="item"
          v-on:delete_item="
            () => {
              _descriptions.splice(index, 1);
            }
          "
        ></image-block>
      </div>
      <br />
    </div>
  </v-container>
</template>

<script>
export default {
  name: "CreateContent",
  props: {
    _descriptions: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    Markdown: () => import("./Markdown"),
    Tiptap: () => import("./Tiptap"),
    CodeBlock: () => import("./Code"),
    ImageBlock: () => import("./Image"),
  },
};
</script>

<style scoped>
</style>