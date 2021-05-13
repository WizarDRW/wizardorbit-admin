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
            <span>{{ process.name }}</span>
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
              ><v-list-item-action> {{ item.name }}</v-list-item-action>
            </div>
          </v-list-item>
        </v-list>
      </v-menu>
      <div class="delete-btn">
        <v-btn
          @click="
            () => {
              $emit('delete_item')
            }
          "
          icon
          ><v-icon>mdi-delete-variant</v-icon></v-btn
        >
      </div>
    </v-card>
    <!-- Markdown içeriği -->
    <v-textarea
      label="İçerik(Markdown)"
      v-model="_content.val"
      outlined
      hide-details
      prepend-inner-icon="mdi-information-outline"
      @click:prepend-inner="
        () => {
          info = !info;
          info_componentId = 'Markdown';
        }
      "
    ></v-textarea>
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
          name: "Matematik",
          data: "math",
        },
        {
          icon: "mdi-language-markdown-outline",
          name: "Markdown",
          data: "markdown",
        },
        {
          icon: "mdi-set-none",
          name: "Diagram",
          data: "diagram",
        },
        {
          icon: "mdi-code-tags",
          name: "Kod Bluğu",
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