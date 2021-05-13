<template>
  <div>
    <v-dialog v-model="dialog" width="1000">
      <v-card>
        <component :is="_componentId"></component>

        <v-card-actions>
          <v-spacer></v-spacer>
          <slot name="buttons">
            <v-btn color="warning" text @click="dialog = false"> Kapat </v-btn>
          </slot>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  components: {
    Markdown: () => import("./markdown/Markdown"),
    Blog: () => import("./blog/Blog.vue"),
  },
  props: {
    _componentId: {
      type: String,
      default: "Blog",
    },
    _dialog: {
      type: Boolean,
      default: false,
    },
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
};
</script>

<style lang="scss" scoped>
</style>