<template>
  <div>
    <div v-if="loading"></div>
    <v-item-group v-else v-model="selectedThemes" multiple>
      <v-row v-masonry>
        <v-col v-for="(item, index) in themes" :key="index" sm="4" md="3">
          <v-item v-slot="{ active, toggle }">
            <v-card
              :color="active ? 'success' : ''"
              :light="item.mode == 'light' && !active"
              @click="toggle"
            >
              <v-card-title>
                {{ item.mode == "dark" ? "(Dark)" : "(Light)" }} {{ item.name }}
              </v-card-title>
              <v-sheet
                v-for="(color, color_index) in item.base_colors"
                :key="color_index"
                :color="color"
                height="50"
              >
              </v-sheet>
            </v-card>
          </v-item>
        </v-col>
      </v-row>
    </v-item-group>
  </div>
</template>

<script>
export default {
  props: {
    _dark: {
      type: String,
      default: "",
    },
    _light: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      themes: [],
      loading: true,
      selected: [],
    };
  },
  async created() {
    if (!this.$store.getters.getThemes)
      await this.$store.dispatch("getApiThemes");
    this.themes = this.$store.getters.getThemes;
    if (this.themes) this.loading = false;
    this._dark &&
      this.selected.push(this.themes.findIndex((x) => x._id == this._dark));
    this._light &&
      this.selected.push(this.themes.findIndex((x) => x._id == this._light));
  },
  computed: {
    selectedThemes: {
      get() {
        return this.selected;
      },
      set(value) {
        var arr = [];
        for (let i = 0; i < value.length; i++) {
          var index = arr.findIndex(
            (x) => x.mode === this.themes[value[i]].mode
          );
          console.log(index);
          if (index > -1) {
            arr.splice(index, 1);
            value.splice(index, 1);
            arr.push(this.themes[value[i]]);
          } else arr.push(this.themes[value[i]]);
        }
        this.selected = value;
        this.$emit("items", arr);
      },
    },
  },
};
</script>

<style lang="">
</style>