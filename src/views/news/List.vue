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
                @click="$router.push({ path: '/new-news' })"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <span>Yeni Haber Oluştur</span>
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
      loading-text="Yükleniyor..."
      hide-default-footer
      class="elevation-1"
      @page-count="pageCount = $event"
    >
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
              @click="editItem(item)"
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
import ApiService from "@/core/services/api.service.js";
import SubHeader from "@/layouts/header/SubHeader";
import jwt_decode from "jwt-decode";
export default {
  data() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      headers: [
        {
          text: "Başlık",
          value: "name",
        },
        {
          text: "Oluşturma Zamanı",
          value: "create_date",
          sortable: true,
        },
        {
          text: "Durum",
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
  mounted() {
    this.loading = true;
    ApiService.get("news").then((x) => {
      this.data = x.data.filter(
        (x) =>
          x.user_data._id ==
          jwt_decode(localStorage.getItem("id_token")).user_id
      );
      this.loading = false;
    });
  },
  methods: {
    editItem(item) {
      this.$router.push({
        path: `/news/edit/${item._id}`,
      });
    }
  },
};
</script>


<style lang="scss" scoped>
</style>