<template>
  <v-container>
    <sub-header></sub-header>
    <v-data-table
      :headers="headers"
      :items="drafts"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      :loading="loading"
      :no-data-text="$t('phrases.noDataAvailable')"
      :loading-text="`${$t('phrases.loading')}...`"
      hide-default-footer
      hide-default-header
      class="elevation-1"
      style="background-color: var(--v-v_datatable_backgound-base)"
      @page-count="pageCount = $event"
    >
      <template #header="{ isMobile, props }">
        <table-header
          v-model="sortBy"
          :headers="props.headers"
          :isMobile="isMobile"
        ></table-header>
      </template>
      <template #body="{ isMobile, items, headers }">
        <table-body
          :isMobile="isMobile"
          :items="items"
          :headers="headers"
          :loading="loading"
          :sortBy="sortBy"
        >
          <!-- Web View -->
          <template #create_date="{ item, moment }">
            {{ moment(item.create_date, $store.getters.getLangName, isMobile) }}
          </template>
          <template #type="{ item }">
            <span
              :style="`${
                item.type == 'chapter'
                  ? 'color: #18f523;'
                  : item.type == 'news'
                  ? 'color: #fcba03;'
                  : item.type == 'forum'
                  ? 'color: #f5141b'
                  : item.type == 'book'
                  ? 'color: #30cbff'
                  : ''
              }`"
            >
              {{
                item.type == "chapter"
                  ? $t("keywords.chapter")
                  : item.type == "news"
                  ? $t("keywords.news")
                  : item.type == "forum"
                  ? $t("keywords.forum")
                  : item.type == "book"
                  ? $t("keywords.book")
                  : item.type
              }}
            </span>
          </template>
          <template #actions="{ item }">
            <v-tooltip color="blue" bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  small
                  v-bind="attrs"
                  v-on="on"
                  class="mr-2"
                  color="primary"
                  @click="edit(item)"
                >
                  mdi-pencil
                </v-icon>
              </template>
              <span>{{ $t("keywords.edit") }}</span>
            </v-tooltip>
            <v-tooltip color="error" bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  color="error"
                  small
                  v-bind="attrs"
                  v-on="on"
                  class="mr-2"
                  @click="
                    () => {
                      dialog_delete = true;
                      deleteRes.id = item._id;
                    }
                  "
                >
                  mdi-delete
                </v-icon>
              </template>
              <span>{{ $t("keywords.delete") }}</span>
            </v-tooltip>
          </template>
          <!-- Mobile View -->
          <template #[`mobile.create_date`]="{ item, moment }">
            {{ moment(item.create_date, $store.getters.getLangName, isMobile) }}
          </template>
          <template #[`mobile.type`]="{ item }">
            <span
              :style="`${
                item.type == 'chapter'
                  ? 'color: #18f523;'
                  : item.type == 'news'
                  ? 'color: #fcba03;'
                  : item.type == 'forum'
                  ? 'color: #f5141b'
                  : item.type == 'book'
                  ? 'color: #30cbff'
                  : ''
              }`"
            >
              {{
                item.type == "chapter"
                  ? $t("keywords.chapter")
                  : item.type == "news"
                  ? $t("keywords.news")
                  : item.type == "forum"
                  ? $t("keywords.forum")
                  : item.type == "book"
                  ? $t("keywords.book")
                  : item.type
              }}
            </span>
          </template>
          <template #[`mobile.actions`]="{ item }">
            <v-icon class="mr-2" @click="edit(item)"> mdi-pencil </v-icon>
            <v-icon
              color="error"
              class="mr-2"
              @click="
                () => {
                  dialog_delete = true;
                  deleteRes.id = item._id;
                }
              "
            >
              mdi-delete
            </v-icon>
          </template>
        </table-body>
      </template>
    </v-data-table>
    <delete
      :_dialog="dialog_delete"
      :_id="deleteRes.id"
      v-on:handleDelete="handleDelete"
      v-on:dialogClose="(value) => (dialog_delete = value)"
    ></delete>
    <div class="alerts">
      <delete-alert
        v-for="(item, index) in deleteItems"
        :key="index"
        v-model="item.status"
        :_msg="item.msg"
        :_type="item.type"
        :_second="item.second"
        :_alert="item.status"
        :_func="item.func"
        :_itemid="item.itemid"
        v-on:deleted="deleteProcess"
      ></delete-alert>
    </div>
  </v-container>
</template>

<script>
export default {
  components: {
    SubHeader: () => import(`@/layouts/header/SubHeader.vue`),
    DeleteAlert: () => import("@/components/Alert/DeleteAlert"),
    Delete: () => import("@/components/Delete"),
    TableHeader: () => import("@/components/Table/Header.vue"),
    TableBody: () => import("@/components/Table/Body.vue"),
  },
  data() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      headers: [
        {
          text: "keywords.title",
          value: "data.name",
          sortable: true,
          width: "25%",
        },
        {
          text: "phrases.create_date",
          value: "create_date",
          sortable: true,
          width: "25%",
        },
        {
          text: "keywords.type",
          value: "type",
          sortable: true,
          width: "25%",
        },
        {
          text: "",
          value: "actions",
          align: "right",
          sortable: false,
          width: "25%",
        },
      ],
      drafts: [],
      loading: true,
      dialog_delete: false,
      deleteRes: {
        name: "",
        id: "",
        index: -1,
      },
      deleteItems: [],
      sortBy: 'name'
    };
  },
  async created() {
    if (!this.$store.getters.getUserDrafts)
      await this.$store.dispatch(
        "getApiUserDrafts",
        this.$store.getters.currentUser._id
      );
    this.drafts = this.$store.getters.getUserDrafts;
    if (this.drafts) this.loading = false;
  },
  methods: {
    edit(item, type) {
      this.$store.dispatch("draft", item);
      this.$router.push({
        name:
          type == "chapter"
            ? "NewChapter"
            : type == "news"
            ? "NewNews"
            : "NewForum",
        params: { draftid: item._id },
      });
    },
    handleDelete(itemid) {
      this.deleteItems.push({
        msg: itemid,
        type: "error",
        second: 100,
        func: "deleteApiDraft",
        status: true,
        itemid: itemid,
      });
    },
    deleteProcess() {
      var count = 0;
      this.deleteItems.forEach((el) => {
        count += el.status ? 0 : 1;
      });
      if (count == this.deleteItems.length) {
        this.deleteItems = [];
      }
    },
  },
};
</script>

<style lang="">
</style>