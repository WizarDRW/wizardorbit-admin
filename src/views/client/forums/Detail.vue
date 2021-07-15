<template>
  <v-container>
    <sub-header :edit_title="forum.name">
      <template v-slot:buttons>
        <div style="width: 100%; text-align: right">
          <v-btn
            :disabled="loading"
            icon
            color="red"
            @click="$router.push({ name: 'Forum' })"
          >
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-btn :loading="loading" icon color="success" @click="handleSave()">
            <v-icon>mdi-content-save-outline</v-icon>
          </v-btn>
        </div>
      </template>
    </sub-header>
    <br />
    <comment v-if="forum._id" :_datas="forum.comments"></comment>
    <div class="alerts">
      <update-alert
        v-if="update.status"
        v-on:input="
          (val) => {
            loading = val;
            update.status = val;
          }
        "
        :_msg="update.msg"
        :_type="update.type"
        :_second="update.second"
        :_alert="update.status"
        :_func="update.func"
        :_item="update.item"
        v-on:updated="save"
      ></update-alert>
    </div>
  </v-container>
</template>


<script>
import { GET_API_FORUM } from "@/core/services/store/forum.module";
import { GET_API_CATEGORY } from "@/core/services/store/category.module";
export default {
  components: {
    Comment: () => import("./components/Comment"),
    UpdateAlert: () => import("@/components/Alert/UpdateAlert"),
    SubHeader: () => import("@/layouts/header/SubHeader"),
  },
  data() {
    return {
      forum: {},
      selectionType: "leaf",
      selection: [],
      categories: [],
      loading: true,
      update: {
        status: false,
        msg: "Güncelleme işlemi yaklaşık 10sn içinde gerçekleşecektir.",
        second: 100,
        type: "warning",
        func: "putApiForum",
        item: {},
      },
    };
  },
  async created() {
    if (!this.$store.getters.getCategory)
      await this.$store.dispatch(GET_API_CATEGORY, "forum");
    this.categories = this.$store.getters.getCategory;
    this.getForum();
  },
  methods: {
    async getForum() {
      if (!this.$store.getters.getForum)
        await this.$store.dispatch(GET_API_FORUM, this.$route.params.id);
      this.forum = this.$store.getters.getForum;
      if (this.forum) this.loading = false;
    },
    handleSave() {
      this.loading = true;
      this.update.item = this.forum;
      this.update.second = 100;
      this.update.status = true;
    },
    async save() {
      this.loading = false;
      this.$router.push({ name: "Forum" });
    },
  },
};
</script>


<style lang="scss" scoped>
</style>