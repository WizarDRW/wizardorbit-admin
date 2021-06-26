<template>
  <div>
    <app-header v-on:hide="hideSidebar"></app-header>
    <app-sidebar :_hide="!hide"></app-sidebar>
    <router-view :key="$route.path"></router-view>
  </div>
</template>

<script>
export default {
  components: {
    AppHeader: () => import("./header/Header"),
    AppSidebar: () => import("./sidebar/Sidebar"),
  },
  data() {
    return {
      hide: false
    }
  },
  methods: {
    hideSidebar() {
      if (this.hide) this.hide = false
      else this.hide = true
    }
  },
};
</script>

<style scoped>
.col {
  padding: 12px 0 0 0;
}
</style>