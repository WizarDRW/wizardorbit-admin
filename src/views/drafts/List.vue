<template>
  <v-container>
    <sub-header></sub-header>
    <v-data-table
      :headers="headers"
      :items="drafts"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      :loading="loading"
      loading-text="Yükleniyor..."
      no-data-text="Taslak bulunmamaktadır!"
      hide-default-footer
      class="elevation-1"
      style="background-color: var(--v-v_datatable_backgound-base)"
      @page-count="pageCount = $event"
    >
      <template #[`item.create_date`]="{ item }">
        {{ item.create_date | moment("DD MMMM YYYY HH:mm") }}
      </template>
      <template #[`item.type`]="{ item }">
        <div
          :style="`${
            item.type == 'chapter'
              ? 'color: #18f523;'
              : item.type == 'news'
              ? 'color: #fcba03;'
              : item.type == 'forum'
              ? 'color: #f5141b'
              : ''
          }`"
        >
          {{
            item.type == "chapter"
              ? "Bölüm"
              : item.type == "news"
              ? "Haber"
              : item.type == "forum"
              ? "Forum"
              : item.type
          }}
        </div>
      </template>
      <template #[`item.actions`]="{ item }">
        <v-tooltip color="primary" bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              color="primary"
              small
              v-bind="attrs"
              v-on="on"
              class="mr-2"
              @click="toEdit(item, item.type)"
            >
              mdi-pencil
            </v-icon>
          </template>
          <span>Düzenle</span>
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
                  deleteDialog = true;
                  deleteRes.id = item._id;
                }
              "
            >
              mdi-delete
            </v-icon>
          </template>
          <span>Sil</span>
        </v-tooltip>
      </template>
    </v-data-table>
    <delete
      :_dialog="deleteDialog"
      :_id="deleteRes.id"
      v-on:handleDelete="handleDelete"
      v-on:dialogClose="(value) => (deleteDialog = value)"
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
  },
  data() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      headers: [
        {
          text: "Başlık",
          value: "data.name",
          sortable: true,
        },
        {
          text: "Oluşturma Zamanı",
          value: "create_date",
          sortable: true,
        },
        {
          text: "Tip",
          value: "type",
          sortable: true,
        },
        {
          text: "",
          value: "actions",
          align: "right",
          sortable: false,
        },
      ],
      drafts: [],
      loading: true,
      deleteDialog: false,
      deleteRes: {
        name: "",
        id: "",
        index: -1,
      },
      deleteItems: [],
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
    toEdit(item, type) {
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
        msg: "Silinme işlemi için",
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