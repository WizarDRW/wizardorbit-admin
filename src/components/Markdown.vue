<template>
  <div>
    <!-- Markdown üst butonları -->
    <v-card>
      <v-menu
        bottom
        left
        v-for="(process, p_index) in processes"
        :key="p_index"
        offset-y
      >
        <template v-slot:activator="{ on: menu, attrs }">
          <v-tooltip top>
            <template v-slot:activator="{ on: tooltip }">
              <v-btn icon
                ><v-icon v-bind="attrs" v-on="{ ...tooltip, ...menu }">
                  {{ process.icon }}
                </v-icon></v-btn
              >
            </template>
            <span>{{ process.label[$store.getters.getLangName] }}</span>
          </v-tooltip>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, g_index) in getMarkdowns(process.data)"
            :key="g_index"
            link
          >
            <div @click="addMarkdowns(item.value)">
              <v-icon>{{ item.icon }}</v-icon
              ><v-list-item-action> {{ $t(item.name) }}</v-list-item-action>
            </div>
          </v-list-item>
        </v-list>
      </v-menu>
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
    </v-card>
    <!-- Markdown içeriği -->
    <v-textarea
      :label="$t('phrases.content_markdown')"
      :rules="[$rule.required, $rule.min(_content.val, 20)]"
      v-model="_content.val"
      outlined
      prepend-inner-icon="mdi-information-outline"
      @click:prepend-inner="
        () => {
          info = !info;
          info_componentId = 'Markdown';
        }
      "
    >
      <template #message="{ message }">
        {{ $t(message, { n: 20 }) }}
      </template>
    </v-textarea>
    <!-- Bilgi bankası dialoğu -->
    <info-bank
      v-if="info"
      :_dialog="info"
      :_componentId="info_componentId"
      v-on:dialogClose="
        (value) => {
          info = value;
        }
      "
    ></info-bank>
  </div>
</template>

<script>
import markdowns from "@/utils/markdowns";
export default {
  name: "MarkDown",
  components: {
    InfoBank: () => import("@/views/infobanks/InfoBank.vue"),
  },
  props: {
    _content: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      info: false,
      info_componentId: "",
      processes: [
        {
          icon: "mdi-sigma",
          label: { tr: "Matematik", en: "Math", de: "Mathematik", fr: "Math" },
          data: "math",
        },
        {
          icon: "mdi-language-markdown-outline",
          label: {
            tr: "Markdown",
            en: "Markdown",
            de: "Markdown",
            fr: "Réduction",
          },
          data: "markdown",
        },
        {
          icon: "mdi-set-none",
          label: {
            tr: "Diagram",
            en: "Diagram",
            de: "Diagramm",
            fr: "Diagramme",
          },
          data: "diagram",
        },
        {
          icon: "mdi-code-tags",
          label: {
            tr: "Kod Bluğu",
            en: "Code Block",
            de: "Codeblock",
            fr: "Bloc de code",
          },
          data: "code",
        },
      ],
    };
  },
  methods: {
    getMarkdowns(lib) {
      return markdowns[lib];
    },
    addMarkdowns(value) {
      this._content.val += value + "\n";
    },
  },
};
</script>

<style scoped>
.delete-btn {
  float: right;
}
</style>