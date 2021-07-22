<template>
  <v-autocomplete
    :items="items"
    :loading="isLoading"
    :search-input.sync="search"
    cache-items
    clearable
    hide-details
    hide-selected
    item-text="finds"
    :label="$t('keywords.find')"
    solo
  >
    <template v-slot:no-data>
      <slot name="no-data">
        <v-list-item>
          <v-list-item-title>
            {{ $t("phrases.search_for_the_page_you_want_to_go_to") }}
          </v-list-item-title>
        </v-list-item>
      </slot>
    </template>
    <template v-slot:selection="{ attr, on, item, selected }">
      <slot
        name="selection"
        v-bind:attr="attr"
        v-bind:on="on"
        v-bind:item="item"
        v-bind:selected="selected"
      >
        <v-chip
          v-bind="attr"
          :input-value="selected"
          color="blue-grey"
          class="white--text"
          v-on="on"
        >
          <v-icon left> {{ item.icon }} </v-icon>
          <span>{{ $t(item.name) }}</span>
        </v-chip>
      </slot>
    </template>
    <template v-slot:item="{ item }">
      <v-list-item @click="handleClick(item.path)">
        <v-list-item-avatar
          :color="item.color"
          class="text-h5 font-weight-light white--text"
        >
          {{ $t(item.name).charAt(0) }}
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            {{ $t(item.name) }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ item.desc.substr(0, 50) }}...
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
      </v-list-item>
    </template>
  </v-autocomplete>
</template>
<script>
export default {
  props: {
    _items: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    isLoading: false,
    items: [],
    search: null,
  }),
  methods: {
    handleClick(path) {
      this.isLoading = true;
      this.$router.push(path);
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    },
  },
  watch: {
    search(val) {
      this.items = this._items.filter((x) => {
        return x.finds.indexOf(val) > -1;
      });
    },
  },
};
</script>