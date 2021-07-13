<template>
  <v-container>
    <sub-header>
      <template v-slot:buttons>
        <div style="width: 100%; text-align: right">
          <v-tooltip color="green" bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
                color="green"
                @click="$router.push({ name: 'NewChapter' })"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <span>{{$t('chapter.list.create')}}</span>
          </v-tooltip>
        </div>
      </template>
    </sub-header>
    <v-data-table
      :headers="headers"
      :items="data"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      :loading="loading"
      :no-data-text="$t('message.noDataAvailable')"
      :loading-text="`${$t('message.loading')}...`"
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
        {{ item.create_date | moment("DD MMM YYYY HH:mm") }}
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
              ? $t("chapter.list.status.published")
              : item.status == "ModeratorAcceping"
              ? $t("chapter.list.status.moderatorApproval")
              : item.status == "Block"
              ? $t("chapter.list.status.blocked")
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
              @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
          </template>
          <span>{{ $t("message.edit") }}</span>
        </v-tooltip>
      </template>
    </v-data-table>
    <div class="text-center pt-2">
      <v-pagination v-model="page" :length="pageCount"></v-pagination>
    </div>
  </v-container>
</template>


<script>
import SubHeader from "@/layouts/header/SubHeader";
import {
  CHAPTER,
  GET_API_USER_CHAPTERS,
} from "@/core/services/store/chapter.module";
export default {
  data() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      headers: [
        {
          text: "chapter.list.title",
          value: "name",
        },
        {
          text: "chapter.list.createDate",
          value: "create_date",
          sortable: true,
        },
        {
          text: "chapter.list.status.main",
          value: "status",
          sortable: true,
        },
        {
          text: "",
          value: "actions",
          sortable: false,
        },
      ],
      data: [],
      loading: true,
    };
  },
  components: {
    SubHeader,
  },
  async created() {
    if (!this.$store.getters.getUserChapters)
      await this.$store.dispatch(
        GET_API_USER_CHAPTERS,
        this.$store.getters.currentUser._id
      );
    this.data = this.$store.getters.getUserChapters;
    this.loading = this.data ? false : true;
  },
  methods: {
    editItem(item) {
      this.$store.dispatch(CHAPTER, item);
      this.$router.push({
        name: `EditChapter`,
        params: { id: item._id },
      });
    },
  },
};
</script>


<style lang="scss" scoped>
</style>