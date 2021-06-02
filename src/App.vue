<template>
  <v-app>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    //
  }),

  beforeCreate() {},
};
</script>

<style>
.v-treeview-node__prepend {
  width: 100% !important;
}
.alerts {
  position: fixed !important;
  bottom: 10px;
  right: 10px;
}
</style>