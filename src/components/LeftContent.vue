<template>
  <div>
    <h2><v-icon>mdi-shape</v-icon> {{ $t("keywords.category") }}</h2>
    <v-treeview
      v-model="inputCategories"
      :items="categories"
      :selection-type="selectionType"
      selectable
      item-text="label"
      open-all
      return-object
    >
      <template v-slot:prepend="{ item }">
        <v-icon>
          {{ item.icon }}
        </v-icon>
        {{ item.label[$store.getters.getLangName] }}
      </template>
    </v-treeview>
    <p></p>
    <slot name="showcase"> </slot>
    <p></p>
    <h2><v-icon>mdi-search-web</v-icon> SEO</h2>
    <p></p>
    <v-text-field
      v-model="_content.name"
      :label="$t('keywords.title')"
      :placeholder="$t('keywords.title')"
      outlined
      dense
      disabled
      prepend-inner-icon="mdi-format-title"
    ></v-text-field>
    <slot name="short_description">
      <v-text-field
        v-model="_content.short_description"
        :label="$t('keywords.description')"
        :placeholder="$t('keywords.description')"
        outlined
        dense
        disabled
        hide-details
        prepend-inner-icon="mdi-card-text-outline"
      ></v-text-field>
    </slot>
    <v-tooltip color="green" bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="success"
          icon
          v-bind="attrs"
          v-on="on"
          @click="
            () => {
              _content.tags.push({ key: '', tag: '' });
            }
          "
        >
          <v-icon> mdi-plus </v-icon>
        </v-btn>
      </template>
      <span>{{ $t("keywords.tag") }}</span>
    </v-tooltip>
    <div v-for="(item, index) in _content.tags" :key="index">
      <v-text-field
        v-model="item.key"
        :label="$t('keywords.key')"
        :placeholder="$t('keywords.key')"
        outlined
        dense
        hide-details
        prepend-inner-icon="mdi-key"
        prepend-icon="mdi-minus"
      >
        <template #prepend>
          <v-btn
            color="error"
            icon
            @click="
              () => {
                _content.tags.splice(index, 1);
              }
            "
          >
            <v-icon>mdi-minus</v-icon>
          </v-btn>
        </template>
      </v-text-field>
      <v-text-field
        v-model="item.tag"
        :label="$t('keywords.tag')"
        :placeholder="$t('keywords.tag')"
        outlined
        dense
        hide-details
        append-icon="mdi-tag-outline"
      ></v-text-field>
      <br />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    _type: {
      type: String,
      default: "",
    },
    _content: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      categories: [],
      selectionType: "leaf",
    };
  },
  async created() {
    if (
      !this.$store.getters.getCategory ||
      this.$store.getters.getCategory.type !== this._type
    )
      await this.$store.dispatch("getApiCategory", this._type);
    this.categories = this.$store.getters.getCategory.categories;
  },
  computed: {
    inputCategories: {
      get() {
        return this._content.categories;
      },
      set(value) {
        this.$emit("selectedCategories", value);
      },
    },
  },
};
</script>

<style lang="">
</style>