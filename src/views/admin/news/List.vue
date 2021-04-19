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
                @click="$router.push({ path: '/admin/new-news' })"
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
      <template #[`item.user_data`]="{ item }">
        {{ item.user_data.full_name }} ({{ item.user_data.email }})
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
      <template #[`item.actions`]="{ item, index }">
        <v-tooltip color="purple" bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              small
              v-bind="attrs"
              v-on="on"
              class="mr-2"
              @click="
                () => {
                  preview = true;
                  news = item;
                }
              "
            >
              mdi-eye
            </v-icon>
          </template>
          <span>Önizle</span>
        </v-tooltip>
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
        <v-tooltip color="red" bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              v-if="item.status != 'Published'"
              small
              v-bind="attrs"
              v-on="on"
              @click="
                () => {
                  (deleteRes.name = item.name),
                    (deleteRes.index = index),
                    (deleteRes.id = item._id),
                    (deleteDialog = true);
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
    <div class="text-center pt-2">
      <v-pagination v-model="page" :length="pageCount"></v-pagination>
    </div>
    <delete
      :_dialog="deleteDialog"
      :_name="deleteRes.name"
      v-on:handleDelete="handleDelete"
      v-on:dialogClose="(value) => (deleteDialog = value)"
    ></delete>
    <preview
      :_dialog="preview"
      :_news="news"
      v-on:dialogClose="
        (value) => {
          preview = value;
          news = {}
        }
      "
    ></preview>
  </v-container>
</template>


<script>
import ApiService from "@/core/services/api.service.js";
import SubHeader from "@/layouts/header/SubHeader";
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
          text: "Yazar",
          value: "user_data",
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
      deleteDialog: false,
      deleteRes: {
        name: "",
        id: "",
        index: -1,
      },
      preview: false,
      news: {},
    };
  },
  components: {
    SubHeader,
    Delete: () => import("./Delete"),
    Preview: () => import("./Preview"),
  },
  mounted() {
    this.loading = true;
    ApiService.get("news").then((x) => {
      this.data = x.data;
      this.loading = false;
    });
  },
  methods: {
    editItem(item) {
      this.$router.push({
        path: `/admin/news/edit/${item._id}`,
      });
    },
    handleDelete() {
      ApiService.delete(`news/id/${this.deleteRes.id}`).then((x) => {
        if (x.status == 200) {
          this.data.splice(this.deleteRes.index, 1);
          this.deleteDialog = false;
        }
      });
    },
  },
};
</script>


<style lang="scss" scoped>
</style>