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
                @click="$router.push({ name: 'AboutCreate' })"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <span>{{$t('about.new')}}</span>
          </v-tooltip>
        </div>
      </template>
    </sub-header>
    <v-data-table
      :headers="headers"
      :items="abouts"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      :loading="loading"
      :loading-text="`${$t('phrases.loading')}...`"
      hide-default-footer
      class="elevation-1"
      @page-count="pageCount = $event"
    >
      <template #[`header._id`]="{ header }">
        {{ $t(`${header.text}`) }}
      </template>
      <template #[`header.type`]="{ header }">
        {{ $t(`${header.text}`) }}
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
          <span>{{$t('keywords.edit')}}</span>
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
          <span>{{$t('keywords.delete')}}</span>
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
          text: "keywords.identity",
          value: "_id",
        },
        {
          text: "keywords.type",
          value: "type",
          sortable: true,
        },
        {
          text: "",
          value: "actions",
          align: "end",
          sortable: false,
        },
      ],
      abouts: [],
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
    if (!this.$store.getters.getAbouts)
      await this.$store.dispatch('getApiAbouts');
    this.abouts = this.$store.getters.getAbouts;
    this.loading = this.abouts ? false : true;
  },
  methods: {
    editItem(item) {
      this.$store.dispatch('putApiAbout', item);
      this.$router.push({
        name: `AboutEdit`,
        params: { id: item._id },
      });
    },
    handleDelete(itemid) {
      this.deleteItems.push({
        msg: itemid,
        type: "error",
        second: 100,
        func: "deleteApiAbout",
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