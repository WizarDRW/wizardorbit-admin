<template>
  <v-container>
    <sub-header>
      <template v-slot:buttons>
        <div style="width: 100%; text-align: right">
          <v-btn icon color="red" @click="$router.push({ path: '/form' })">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </div>
      </template>
    </sub-header>
    <br>
    <comment :_datas="form.comments"></comment>
  </v-container>
</template>


<script>
import ApiService from "@/core/services/api.service.js";
import SubHeader from "@/layouts/header/SubHeader";
export default {
  components: {
    SubHeader,
    Comment: () => import("./components/Comment"),
  },
  data() {
    return {
      form: {},
      selectionType: "leaf",
      selection: [],
      categories: [],
    };
  },
  created() {
    this.getForm();
    ApiService.get(`formcategories/`).then((x) => {
      this.categories = x.data.map((x) => {
        return {
          id: x.id,
          label: x.label,
          icon: x.icon,
          children: x.children,
        };
      });
    });
  },
  methods: {
    getForm() {
      ApiService.get(`forms/id/${this.$route.params.id}`).then((x) => {
        this.form = x.data;
        console.log(this.form);
        var arr = [];
        x.data.comments.forEach((element) => {
          ApiService.get(`/users/id/${element.user_id}`).then((x) => {
              console.log(x);
            arr.push({
              ...element,
              full_name: x.data.first_name + " " + x.data.last_name,
              email: x.data.email,
              image_path: x.data.image_path,
            });
          });
        });
        this.loading = "none";
        this.form.comments = arr;
      });
    },
  },
};
</script>


<style lang="scss" scoped>
</style>