<template>
  <v-container fluid>
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
                @click="$router.push({ name: 'NewForum' })"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <span>{{ $t("forum.new") }}</span>
          </v-tooltip>
        </div>
      </template>
    </sub-header>
    <v-data-table
      :headers="headers"
      :items="forums"
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
            <v-tooltip color="orange" bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  small
                  v-bind="attrs"
                  v-on="on"
                  class="mr-2"
                  @click="toDetailItem(item)"
                >
                  mdi-comment-multiple-outline
                </v-icon>
              </template>
              <span>{{ $t("keywords.comments") }}</span>
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
          </template>
          <!-- Mobile View -->
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
            <v-icon small class="mr-2" @click="toDetailItem(item)">
              mdi-comment-multiple-outline
            </v-icon>
            <v-icon class="mr-2" @click="edit(item)"> mdi-pencil </v-icon>
          </template>
        </table-body>
      </template>
    </v-data-table>
    <div class="text-center pt-2">
      <v-pagination v-model="page" :length="pageCount"></v-pagination>
    </div>
  </v-container>
</template>


<script>
export default {
  components: {
    SubHeader: () => import("@/layouts/header/SubHeader"),
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
          width: "50%",
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
      forums: [],
      loading: true,
      sortBy: 'name'
    };
  },
  async created() {
    if (!this.$store.getters.getUserForums) {
      await this.$store.dispatch(
        "getApiUserForums",
        this.$store.getters.currentUser._id
      );
    }
    this.forums = this.$store.getters.getUserForums;
    this.loading = this.forums ? false : true;
  },
  methods: {
    toEditItem(item) {
      this.$store.dispatch("forum", item);
      this.$router.push({
        name: `EditForum`,
        params: { id: item._id },
      });
    },
    toDetailItem(item) {
      this.$store.dispatch("forum", item);
      this.$router.push({
        name: `DetailForum`,
        params: { id: item._id },
      });
    },
  },
};
</script>


<style lang="scss" scoped>
</style>