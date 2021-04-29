<template>
  <v-app>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { CURRENT_USER } from "@/core/services/store/auth.module";
export default {
  name: "App",

  components: {},

  data: () => ({
    //
  }),

  beforeCreate() {
    this.$store.dispatch(CURRENT_USER)
  },
};
</script>
<style>
.v-treeview-node__prepend {
  width: 100% !important;
}
</style>