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
                @click="$router.push({ name: 'NewForum' })"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <span>{{$t('forum.new')}}</span>
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
      class="elevation-1"
      style="background-color: var(--v-v_datatable_backgound-base)"
      @page-count="pageCount = $event"
    >
      <template #[`header.name`]="{ header }">
        {{ $t(`${header.text}`) }}
      </template>
      <template #[`header.create_date`]="{ header }">
        {{ $t(`${header.text}`) }}
      </template>
      <template #[`header.status`]="{ header }">
        {{ $t(`${header.text}`) }}
      </template>
      <template #[`item.create_date`]="{ item }">
        {{ item.create_date | moment("DD MMMM YYYY HH:mm") }}
      </template>
      <template #[`item.status`]="{ item }">
        <div
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
        </div>
      </template>
      <template #[`item.actions`]="{ item }">
        <v-tooltip color="blue" bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              small
              v-bind="attrs"
              v-on="on"
              class="mr-2"
              @click="toEditItem(item)"
            >
              mdi-pencil
            </v-icon>
          </template>
          <span>{{ $t("keywords.edit") }}</span>
        </v-tooltip>
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
      </template>
    </v-data-table>
    <div class="text-center pt-2">
      <v-pagination v-model="page" :length="pageCount"></v-pagination>
    </div>
  </v-container>
</template>


<script>
import { FORUM, GET_API_USER_FORUMS } from "@/core/services/store/forum.module";
import SubHeader from "@/layouts/header/SubHeader";
export default {
  data() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      headers: [
        {
          text: "keywords.title",
          value: "name",
        },
        {
          text: "phrases.create_date",
          value: "create_date",
          sortable: true,
        },
        {
          text: "keywords.status",
          value: "status",
          sortable: true,
        },
        {
          text: "",
          value: "actions",
          sortable: false,
        },
      ],
      forums: [],
      loading: true,
    };
  },
  components: {
    SubHeader,
  },
  async created() {
    if (!this.$store.getters.getUserForums) {
      await this.$store.dispatch(
        GET_API_USER_FORUMS,
        this.$store.getters.currentUser._id
      );
    }
    this.forums = this.$store.getters.getUserForums;
    this.loading = this.forums.length > 0 ? false : true;
  },
  methods: {
    toEditItem(item) {
      this.$store.dispatch(FORUM, item);
      this.$router.push({
        name: `EditForum`,
        params: { id: item._id },
      });
    },
    toDetailItem(item) {
      this.$store.dispatch(FORUM, item);
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