<template>
  <tbody v-if="loading">
    <tr>
      <td :colspan="headers.length" align="center">
        {{ $t("phrases.loading") }}
      </td>
    </tr>
  </tbody>
  <tbody v-else-if="items.length <= 0">
    <tr>
      <td :colspan="headers.length" align="center">
        {{ $t("phrases.noDataAvailable") }}
      </td>
    </tr>
  </tbody>
  <tbody v-else-if="!isMobile">
    <tr v-for="(item, i) in items" :key="i">
      <td v-for="(header, i_h) in headers" :key="i_h" :align="header.align">
        <slot :name="header.value" :item="item" :moment="moment">
          {{ item[header.value] ? item[header.value] : "" }}
        </slot>
      </td>
    </tr>
  </tbody>
  <v-data-iterator
    v-else
    :items="items"
    :items-per-page.sync="itemsPerPage"
    hide-default-footer
    :sort-by="sortBy.toLowerCase()"
    :sort-desc="true"
  >
    <template v-slot:default="props">
      <v-row>
        <v-col
          v-for="item in props.items"
          :key="item.name"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card>
            <v-divider></v-divider>

            <v-list dense>
              <v-list-item v-for="(header, i_h) in headers" :key="i_h">
                <v-list-item-content
                  ><span
                    :style="`color: ${header.value == sortBy ? '#3596F2' : ''}`"
                    >{{ header.text ? $t(header.text) + ":" : "" }}</span
                  ></v-list-item-content
                >
                <v-list-item-content class="align-end">
                  <span
                    :style="`text-align: end; color: ${
                      header.value == sortBy ? '#3596F2' : ''
                    }`"
                    ><slot
                      :name="`mobile.${header.value}`"
                      :item="item"
                      :moment="moment"
                      >{{ item[header.value] ? item[header.value] : "" }}</slot
                    ></span
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </v-data-iterator>
</template>

<script>
import moment from "moment";
export default {
  props: {
    loading: {
      type: Boolean,
      default: true,
    },
    items: {
      type: Array,
      default: () => [],
    },
    headers: {
      type: Array,
      default: () => [],
    },
    isMobile: {
      type: Boolean,
      default: false,
    },
    sortBy: {
      type: String,
      default: "name",
    },
    role: {
      type: String,
      default: "client",
    },
    itemsPerPage: {
      type: Number,
      default: 3,
    },
  },
  methods: {
    edit(item) {
      this.$emit("edit", item);
    },
    handleDelete(id) {
      this.$emit("delete", id);
    },
    moment(date, lang, mobile) {
      return moment(date)
        .locale(lang)
        .format(mobile ? "DD/MM/YY HH:mm" : "DD MMM YYYY HH:mm");
    },
    preview(item) {
      this.$emit("preview", item);
    },
  },
};
</script>

<style lang="">
</style>