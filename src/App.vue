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

  metaInfo() {
    return {
      title: `${this.$i18n.t("title")}`,
      meta: [
        {
          name: "description",
          content:
            "En yeni teknoloji haberleri, Bilgi öğrenmek için yazılar ve sorunlarınıza çözüm bulur. ",
        },
        {
          property: "og:title",
          content: "Wizard Orbit",
        },
        { property: "og:wizardorbit.com", content: "Sihirbaz" },
        { property: "og:type", content: "website" },
        { name: "robots", content: "index,follow" },
      ],
    };
  },
};
</script>

<style>
#app {
  background-color: var(--v-background-base);
}
.v-treeview-node__prepend {
  width: 100% !important;
}
.alerts {
  position: fixed !important;
  bottom: 10px;
  right: 10px;
  z-index: 999;
}
</style>