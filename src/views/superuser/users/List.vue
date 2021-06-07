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
                @click="$router.push({ name: 'UserCreate' })"
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
      :items="users"
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
      <template #[`item.role`]="{ item }">
        {{
          item.role == "SuperUser"
            ? "Süper Kullanıcı"
            : item.role == "Admin"
            ? "Yetkili"
            : "Kullanıcı"
        }}
      </template>
      <template #[`item.status`]="{ item }">
        <div
          :style="`${
            item.status == 'Online'
              ? 'color: #18f523;'
              : item.status == 'Offline'
              ? 'color: #7a7a7a'
              : 'color: #f5141b'
          }`"
        >
          {{
            item.status == "Online"
              ? "Çevrimiçi"
              : item.status == "Offline"
              ? "Çevrimdışı"
              : "Bloklandı"
          }}
        </div>
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
        <v-tooltip
          :color="item.status == 'Online' ? `error` : `success`"
          bottom
        >
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              small
              :color="item.status == 'Online' ? `error` : `success`"
              v-bind="attrs"
              v-on="on"
              class="mr-2"
              @click="block(item)"
            >
              {{
                item.status == "Online"
                  ? "mdi-account-cancel-outline"
                  : "mdi-account-outline"
              }}
            </v-icon>
          </template>
          <span>{{
            item.status == "Online" ? "Bloke koy!" : "Blokeyi kaldır!"
          }}</span>
        </v-tooltip>
        <v-tooltip v-if="item.type == 'internal'" color="warning" bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              small
              color="warning"
              v-bind="attrs"
              v-on="on"
              class="mr-2"
              @click="
                () => {
                  resetpassword.status = true;
                  resetpassword.id = item._id;
                }
              "
            >
              mdi-lock-reset
            </v-icon>
          </template>
          <span>Şifre değiştir</span>
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
    <reset-password
      :_dialog="resetpassword.status"
      :_id="resetpassword.id"
      v-on:dialogClose="(val) => (resetpassword.status = val)"
    ></reset-password>
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
import { USER, GET_API_USERS } from "@/core/services/store/user.module";
export default {
  components: {
    SubHeader: () => import(`@/layouts/header/SubHeader`),
    Delete: () => import(`@/components/Delete.vue`),
    DeleteAlert: () => import(`@/components/Alert/DeleteAlert.vue`),
    ResetPassword: () => import(`./components/ResetPassword.vue`),
  },
  data() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      headers: [
        {
          text: "Mail",
          value: "email",
        },
        {
          text: "İlk Ad",
          value: "first_name",
        },
        {
          text: "Son Ad",
          value: "last_name",
        },
        {
          text: "Oluşturma Zamanı",
          value: "create_date",
          sortable: true,
        },
        {
          text: "Yetki",
          value: "role",
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
          align: "end",
          sortable: false,
        },
      ],
      users: [],
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
    if (!this.$store.getters.getUsers)
      await this.$store.dispatch(GET_API_USERS);
    this.users = this.$store.getters.getUsers;
    this.loading = this.users ? false : true;
  },
  methods: {
    editItem(item) {
      this.$store.dispatch(USER, item);
      this.$router.push({
        name: `UserEdit`,
        params: { id: item._id },
      });
    },
    block(item) {
      var data = {
        _id: item._id,
        status: item.status == "Online" ? "Block" : "Online",
      };
      this.$store.dispatch("putApiUserStatus", data);
    },
    handleDelete(itemid) {
      this.deleteItems.push({
        msg: "Silinme işlemi için",
        type: "error",
        second: 100,
        func: "deleteApiUser",
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