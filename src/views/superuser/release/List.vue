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
                @click="$router.push({ name: 'ReleaseCreate' })"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <span>Yeni Kullanıcı Oluştur</span>
          </v-tooltip>
        </div>
      </template>
    </sub-header>
    <v-data-table
      :headers="headers"
      :items="releases"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      :loading="loading"
      loading-text="Yükleniyor..."
      hide-default-footer
      class="elevation-1"
      @page-count="pageCount = $event"
    >
      <template #[`item.create_date`]="{ item }">
        {{ item.create_date | moment("DD MMM YYYY HH:mm") }}
      </template>
      <template #[`item.actions`]="{ item }">
        <v-tooltip color="blue" bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              small
              color="primary"
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
        <v-tooltip color="error" bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              small
              color="error"
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
              mdi-delete-outline
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
    SubHeader: () => import(`@/layouts/header/SubHeader`),
    Delete: () => import(`@/components/Delete.vue`),
    DeleteAlert: () => import(`@/components/Alert/DeleteAlert.vue`),
  },
  data() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      headers: [
        {
          text: "ID",
          value: "_id",
        },
        {
          text: "Sürüm Notu",
          value: "option.version",
          sortable: true,
        },
        {
          text: "Tarih",
          value: "create_date",
          sortable: true,
        },
        {
          text: "",
          value: "actions",
          align: "end",
          sortable: false,
        },
      ],
      releases: [],
      loading: true,
      deleteDialog: false,
      deleteRes: {
        name: "",
        id: "",
        index: -1,
      },
      deleteItems: [],
      resetpassword: {
        status: false,
        id: null,
      },
    };
  },
  async created() {
    if (!this.$store.getters.getReleases)
      await this.$store.dispatch("getApiReleases");
    this.releases = this.$store.getters.getReleases;
    this.loading = this.releases ? false : true;
  },
  methods: {
    editItem(item) {
      this.$store.dispatch("putApiRelease", item);
      this.$router.push({
        name: `ReleaseEdit`,
        params: { id: item._id },
      });
    },
    handleDelete(itemid) {
      this.deleteItems.push({
        msg: "Silinme işlemi için",
        type: "error",
        second: 100,
        func: "deleteApiRelease",
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


<style lang="scss" scoped>
</style>