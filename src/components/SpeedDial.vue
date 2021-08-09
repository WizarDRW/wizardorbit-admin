<template>
  <v-speed-dial
    v-model="fab"
    :top="_top"
    :right="_right"
    :bottom="_bottom"
    :direction="_direction"
    :open-on-hover="_openOnHover"
    :transition="_transition"
  >
    <template v-slot:activator>
      <v-btn v-model="fab" fab>
        <v-icon v-if="fab"> mdi-close </v-icon>
        <v-icon v-else> mdi-plus </v-icon>
      </v-btn>
    </template>
    <slot name="prepend"></slot>
    <slot>
      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            small
            fab
            @click="
              _contents.push({
                sort: _contents.length - 1,
                type: 'v-card-title',
                val: '',
              })
            "
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-format-title</v-icon>
          </v-btn>
        </template>
        <span>{{ $t("speedDial.cardTitle") }}</span>
      </v-tooltip>
      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            small
            fab
            @click="
              _contents.push({
                sort: _contents.length - 1,
                type: 'v-card-subtitle',
                val: '',
              })
            "
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-subtitles</v-icon>
          </v-btn>
        </template>
        <span>{{ $t("speedDial.cardSubTitle") }}</span>
      </v-tooltip>
      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            small
            fab
            @click="
              _contents.push({
                sort: _contents.length - 1,
                type: 'v-card-text',
                val: '',
              })
            "
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-text-box-multiple-outline</v-icon>
          </v-btn>
        </template>
        <span>{{ $t("speedDial.cardText") }}</span>
      </v-tooltip>
      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            small
            fab
            @click="
              _contents.push({
                sort: _contents.length - 1,
                type: 'markdown',
                val: '',
              })
            "
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-language-markdown-outline</v-icon>
          </v-btn>
        </template>
        <span>{{ $t("speedDial.markdown") }}</span>
      </v-tooltip>
      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            small
            fab
            @click="
              _contents.push({
                sort: _contents.length - 1,
                type: 'code',
                lang: { id: 'js', name: 'javascript' },
                val: '',
              })
            "
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-code-tags</v-icon>
          </v-btn>
        </template>
        <span>{{ $t("speedDial.code") }}</span>
      </v-tooltip>
      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            small
            fab
            @click="
              _contents.push({
                sort: _contents.length - 1,
                type: 'tiptap',
                val: '',
              })
            "
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-text-recognition</v-icon>
          </v-btn>
        </template>
        <span>{{ $t("speedDial.textEditor") }}</span>
      </v-tooltip>
      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            small
            fab
            @click="
              _contents.push({
                sort: _contents.length - 1,
                type: 'image',
                val: '',
                width: 500,
              })
            "
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-image-outline</v-icon>
          </v-btn>
        </template>
        <span>{{ $t("speedDial.image") }}</span>
      </v-tooltip>
    </slot>
    <slot name="append"></slot>
  </v-speed-dial>
</template>

<script>
export default {
  props: {
    _top: {
      type: Boolean,
      default: false,
    },
    _right: {
      type: Boolean,
      default: false,
    },
    _bottom: {
      type: Boolean,
      default: false,
    },
    _left: {
      type: Boolean,
      default: false,
    },
    _direction: {
      type: String,
      default: "left",
    },
    _openOnHover: {
      type: Boolean,
      default: false,
    },
    _transition: {
      type: String,
      default: "slide-y-reverse-transition",
    },
    _contents: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      fab: false,
    };
  },
};
</script>

<style scoped>
.v-speed-dial {
  position: fixed;
  bottom: 50px;
}

.v-btn--floating {
  position: relative;
}

@media only screen and (max-width: 947px) {
  .v-speed-dial {
    position: fixed;
    bottom: 70px;
  }
}
@media only screen and (max-width: 527px) {
  .v-speed-dial {
    position: fixed;
    bottom: 90px;
  }
}
</style>