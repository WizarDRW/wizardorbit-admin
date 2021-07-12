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
                @click="$router.push({ name: 'NewNews' })"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <span>{{$t('news.list.create')}}</span>
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
              ? "Yayında"
              : item.status == "ModeratorAcceping"
              ? "Onay Bekliyor"
              : item.status == "Block"
              ? "Yazı Bloklandı"
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
          <span>Düzenle</span>
        </v-tooltip>
      </template>
    </v-data-table>
    <div class="text-center pt-2">
      <v-pagination v-model="page" :length="pageCount"></v-pagination>
    </div>
  </v-container>
</template>


<script>
import { NEWS, GET_API_USER_THE_NEWS } from "@/core/services/store/news.module";
export default {
  components: {
    SubHeader: () => import("@/layouts/header/SubHeader"),
  },
  data() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      headers: [
        {
          text: "news.list.title",
          value: "name",
        },
        {
          text: "news.list.createDate",
          value: "create_date",
          sortable: true,
        },
        {
          text: "news.list.status.main",
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
  async created() {
    if (!this.$store.getters.getUserTheNews) await this.$store.dispatch(GET_API_USER_THE_NEWS, this.$store.getters.currentUser._id);
    this.data = this.$store.getters.getUserTheNews;
    if(this.data) this.loading = false;
  },
  methods: {
    toEditItem(item) {
      this.$store.dispatch(NEWS, item);
      this.$router.push({
        name: `EditNews`,
        params: { id: item._id }
      });
    }
  },
};
</script>


<style lang="scss" scoped>
</style>