<template>
  <v-container>
    <sub-header>
      <template v-slot:buttons>
        <div style="width: 100%; text-align: right">
          <v-tooltip color="green" left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
                color="green"
                @click="$router.push({ name: 'AdminNewNews' })"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <span>{{ $t("news.new") }}</span>
          </v-tooltip>
        </div>
      </template>
    </sub-header>
    <v-data-table
      :headers="headers"
      :items="thenews"
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
          <template #user_data="{ item }">
            {{ item.user_data.first_name + " " + item.user_data.last_name }}
            ({{ item.user_data.email }})
          </template>
          <template #create_date="{ item, moment }">
            {{ moment(item.create_date, $store.getters.getLangName, isMobile) }}
          </template>
          <template #status="{ item }">
            <span
              :style="`${
                item.status == 'Published'
                  ? 'color: #18f523;'
                  : item.status == 'ModeratorAcceping'
                  ? 'color: #fcba03;'
                  : item.status == 'Block'
                  ? 'color: #f5141b'
                  : ''
              }`"
            >
              {{
                item.status == "Published"
                  ? $t("phrases.published")
                  : item.status == "ModeratorAcceping"
                  ? $t("phrases.moderatorApproval")
                  : item.status == "Block"
                  ? $t("phrases.blocked")
                  : item.status
              }}
            </span>
          </template>
          <template #actions="{ item }">
            <v-tooltip color="purple" bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  small
                  v-bind="attrs"
                  v-on="on"
                  class="mr-2"
                  @click="
                    () => {
                      preview(item);
                    }
                  "
                >
                  mdi-eye
                </v-icon>
              </template>
              <span>{{ $t("keywords.preview") }}</span>
            </v-tooltip>
            <v-tooltip color="blue" bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  small
                  v-bind="attrs"
                  v-on="on"
                  class="mr-2"
                  @click="edit(item)"
                >
                  mdi-pencil
                </v-icon>
              </template>
              <span>{{ $t("keywords.edit") }}</span>
            </v-tooltip>
            <v-tooltip color="red" bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  v-if="item.status != 'Published'"
                  small
                  v-bind="attrs"
                  v-on="on"
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
          <template #[`mobile.user_data`]="{ item }">
            {{ item.user_data.first_name + " " + item.user_data.last_name }}
            ({{ item.user_data.username }})
          </template>
          <template #[`mobile.create_date`]="{ item, moment }">
            {{ moment(item.create_date, $store.getters.getLangName, isMobile) }}
          </template>
          <template #[`mobile.status`]="{ item }">
            <span
              :style="`${
                item.status == 'Published'
                  ? 'color: #18f523;'
                  : item.status == 'ModeratorAcceping'
                  ? 'color: #fcba03;'
                  : item.status == 'Block'
                  ? 'color: #f5141b'
                  : ''
              }`"
            >
              {{
                item.status == "Published"
                  ? $t("phrases.published")
                  : item.status == "ModeratorAcceping"
                  ? $t("phrases.moderatorApproval")
                  : item.status == "Block"
                  ? $t("phrases.blocked")
                  : item.status
              }}
            </span>
          </template>
          <template #[`mobile.actions`]="{ item }">
            <v-icon class="mr-2" @click="preview(item)"> mdi-eye </v-icon>
            <v-icon class="mr-2" @click="edit(item)"> mdi-pencil </v-icon>
            <v-icon
              v-if="item.status != 'Published'"
              small
              @click="
                (item) => {
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
    <div class="text-center pt-2">
      <v-pagination v-model="page" :length="pageCount"></v-pagination>
    </div>
    <delete
      :_dialog="dialog_delete"
      :_id="deleteRes.id"
      v-on:handleDelete="handleDelete"
      v-on:dialogClose="(value) => (dialog_delete = value)"
    ></delete>
    <preview
      :_dialog="dialog_preview"
      :_content="news"
      :_created="true"
      _api="putApiNews"
      v-on:dialogClose="
        (value) => {
          dialog_preview = value;
          news = {};
        }
      "
    ></preview>
  </v-container>
</template>


<script>
export default {
  components: {
    SubHeader: () => import("@/layouts/header/SubHeader"),
    Delete: () => import("@/components/Delete"),
    Preview: () => import("@/components/Preview"),
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
          value: "name",
          width: "25%",
        },
        {
          text: "phrases.create_user",
          value: "user_data",
          width: "25%",
        },
        {
          text: "phrases.create_date",
          value: "create_date",
          sortable: true,
          width: "20%",
        },
        {
          text: "keywords.status",
          value: "status",
          sortable: true,
          width: "20%",
        },
        {
          text: "",
          value: "actions",
          sortable: false,
          width: "10%",
        },
      ],
      thenews: [],
      loading: true,
      dialog_delete: false,
      deleteRes: {
        name: "",
        id: "",
        index: -1,
      },
      dialog_preview: false,
      news: {},
    };
  },
  async created() {
    if (!this.$store.getters.getTheNews)
      await this.$store.dispatch("getApiTheNews");
    this.thenews = this.$store.getters.getTheNews;
    if (this.thenews) this.loading = false;
  },
  methods: {
    edit(item) {
      this.$store.dispatch("news", item);
      this.$router.push({
        name: `AdminEditNews`,
        params: { id: item._id },
      });
    },
    handleDelete(itemid) {
      this.$store.dispatch("delete", {
        msg: itemid,
        func: "deleteApiNews",
        itemid: itemid,
      });
    },
    preview(item) {
      this.dialog_preview = true;
      this.chapter = item;
    },
  },
};
</script>


<style lang="scss" scoped>
.v-application .align-end {
  justify-content: flex-end;
}
</style>