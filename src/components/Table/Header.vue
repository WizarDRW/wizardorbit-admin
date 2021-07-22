<template>
  <thead v-if="!isMobile">
    <tr>
      <th v-for="(header, i) in headers" :key="i" :width="header.width">
        {{ $t(header.text) }}
      </th>
    </tr>
  </thead>
  <v-select
    v-else
    v-model="input"
    flat
    solo
    hide-details
    :items="headers.filter((x) => x.sortable)"
    item-value="value"
    prepend-inner-icon="mdi-magnify"
    label="Sort by"
  >
    <template #selection="{ item }">
      {{ $t(item.text) }}
    </template>
    <template #item="{ item }">
      {{ $t(item.text) }}
    </template>
  </v-select>
</template>

<script>
export default {
  props: {
    isMobile: {
      type: Boolean,
      default: false,
    },
    headers: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      sortBy: "name",
    };
  },
  computed: {
    input: {
      get() {
        return this.sortBy;
      },
      set(value) {
        this.sortBy = value;
        this.$emit("input", value);
      },
    },
  },
};
</script>

<style lang="">
</style>