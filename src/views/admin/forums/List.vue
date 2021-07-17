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
                @click="$router.push({ path: '/admin/new-forum' })"
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
      <template #[`header.user_data`]="{ header }">
        {{ $t(`${header.text}`) }}
      </template>
      <template #[`header.create_date`]="{ header }">
        {{ $t(`${header.text}`) }}
      </template>
      <template #[`header.status`]="{ header }">
        {{ $t(`${header.text}`) }}
      </template>
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
                  forum = item;
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
              @click="editItem(item)"
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
              @click="detailItem(item)"
            >
              mdi-comment-multiple-outline
            </v-icon>
          </template>
          <span>{{ $t("keywords.comments") }}</span>
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
                  deleteDialog = true;
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
    <preview
      :_dialog="preview"
      :_content="forum"
      _created
      _api="putApiForum"
      v-on:dialogClose="
        (value) => {
          preview = value;
        }
      "
    >
      <div v-html="forum.description"></div>
    </preview>
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
import { FORUM, GET_API_FORUMS } from "@/core/services/store/forum.module";
export default {
  components: {
    SubHeader: () => import("@/layouts/header/SubHeader"),
    Delete: () => import("@/components/Delete"),
    Preview: () => import("@/components/Preview"),
    DeleteAlert: () => import("@/components/Alert/DeleteAlert"),
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
        },
        {
          text: "phrases.create_user",
          value: "user_data",
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
      deleteDialog: false,
      deleteRes: {
        id: "",
        index: -1,
      },
      deleteItems: [],
      preview: false,
      forum: {},
    };
  },
  async created() {
    if (!this.$store.getters.getForums)
      await this.$store.dispatch(GET_API_FORUMS);
    this.forums = this.$store.getters.getForums;
    if (this.forums) this.loading = false;
  },
  methods: {
    editItem(item) {
      this.$store.dispatch(FORUM, item);
      this.$router.push({
        path: `/admin/forum/edit/${item._id}`,
      });
    },
    detailItem(item) {
      this.$store.dispatch(FORUM, item);
      this.$router.push({
        path: `/admin/forum/detail/${item._id}`,
      });
    },
    handleDelete(itemid) {
      this.deleteItems.push({
        msg: itemid,
        type: "error",
        second: 100,
        func: "deleteApiForum",
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