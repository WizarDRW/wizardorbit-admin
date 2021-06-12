<template>
  <v-card>
    <v-navigation-drawer app v-model="_hide">
      <img
        src="@/assets/logo.png"
        width="75%"
        alt=""
      />

      <v-divider></v-divider>
      <v-list dense nav>
        <v-list-item-group mandatory color="warning">
          <div v-for="(nav, i) in $options.nav" :key="i">
            <v-list-group
              v-if="nav._roles.includes(user.role)"
              :value="true"
              no-action
              sub-group
            >
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title>
                    <h2>{{ nav._name }}</h2>
                  </v-list-item-title>
                </v-list-item-content>
              </template>
              <v-list-item
                v-for="item in nav.children"
                :key="item._name"
                link
                @click="$router.push({ path: item.to })"
              >
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ item._name }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
            </v-list-group>
          </div>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
import nav from "./_nav";
export default {
  name: "Sidebar",
  nav,
  props: {
    _hide: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      user: {},
    };
  },
  beforeMount() {
    this.user = this.$store.getters.currentUser;
  },
};
</script>

<style lang="scss" scoped>
</style>