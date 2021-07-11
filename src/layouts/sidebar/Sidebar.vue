<template>
  <v-navigation-drawer color="sidebar_menu_background" tile app v-model="_hide">
    <v-layout style="margin-top: 5px;" align-center justify-center wrap>
      <div>
        <v-img src="@/assets/logo.png" width="50px" :alt="$t('title')"></v-img>
      </div>
      <h2 class="text-center">{{ $t("title") }}</h2>
    </v-layout>
    <v-divider></v-divider>
    <v-list expand flat dense nav>
      <v-list-item-group mandatory color="warning">
        <div v-for="(nav, i) in navigation" :key="i">
          <v-list-group
            color="sidebar_list_group"
            v-if="nav._roles.includes(user.role)"
            :value="true"
            prepend-icon=""
            no-action
            sub-group
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>
                  <h2 class="sidebar_list_menu_color--text">
                    {{ $t(nav._name) }}
                  </h2>
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="(item, index) in nav.children"
              :key="index"
              link
              @click="$router.push({ path: item.to })"
            >
              <v-list-item-icon>
                <v-badge
                  v-if="
                    item.to == '/drafts' &&
                    $store.getters.getUserDrafts.length > 0
                  "
                  bordered
                  left
                  color="error"
                  :content="$store.getters.getUserDrafts.length"
                  overlap
                >
                  <v-icon color="sidebar_list_menu_color">{{
                    item.icon
                  }}</v-icon>
                </v-badge>

                <v-icon v-else color="sidebar_list_menu_color">{{
                  item.icon
                }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="sidebar_list_menu_color--text">{{
                  $t(item._name)
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
          </v-list-group>
        </div>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import nav from "./_nav";
export default {
  name: "Sidebar",
  props: {
    _hide: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      user: {},
      draftCount: 0,
      navigation: [],
    };
  },
  async beforeMount() {
    this.navigation = nav;
    this.user = this.$store.getters.currentUser;
    if (!this.$store.getters.getUserDrafts)
      await this.$store.dispatch(
        "getApiUserDrafts",
        this.$store.getters.currentUser._id
      );
  },
};
</script>

<style lang="scss" scoped>
</style>