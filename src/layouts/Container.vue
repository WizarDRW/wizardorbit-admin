<template>
  <div>
    <app-header v-on:hide="hideSidebar"></app-header>
    <app-sidebar :_hide="!hide"></app-sidebar>
    <router-view :key="$route.path"></router-view>
    <div class="alerts">
      <div v-for="(item) in $store.getters.getAllQueues" :key="item.id">
        <add-alert
          v-if="item.type == 'add'"
          :_content="item"
          :_queue_id="item.id"
        ></add-alert>
        <update-alert
          v-if="item.type == 'update'"
          :_content="item"
          :_queue_id="item.id"
        ></update-alert>
        <delete-alert
          v-if="item.type == 'delete'"
          :_content="item"
          :_queue_id="item.id"
        ></delete-alert>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    AppHeader: () => import("./header/Header"),
    AppSidebar: () => import("./sidebar/Sidebar"),
    AddAlert: () => import("@/components/Alert/AddAlert"),
    DeleteAlert: () => import("@/components/Alert/DeleteAlert"),
    UpdateAlert: () => import("@/components/Alert/UpdateAlert"),
  },
  data() {
    return {
      hide: false,
    };
  },
  methods: {
    hideSidebar() {
      if (this.hide) this.hide = false;
      else this.hide = true;
    },
  },
};
</script>

<style scoped>
.col {
  padding: 12px 0 0 0;
}
</style>