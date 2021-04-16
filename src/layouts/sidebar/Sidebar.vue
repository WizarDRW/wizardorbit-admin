<template>
  <v-card>
    <v-navigation-drawer app v-model="_hide">
      <img
        src="https://sihirbazblog.com/assets/sihirbazblog_logo.png"
        width="75%"
        alt=""
      />

      <v-divider></v-divider>
      <v-list v-for="nav in $options.nav" :key="nav._name" dense nav>        
        <div v-if="user.role != 'Client' && nav._id == 10023">
          <h1>{{ nav._name }}</h1>
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
        </div>
        <div v-else-if="user.role == 'SuperUser' && nav._id == 10024">
          <h1>{{ nav._name }}</h1>
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
        </div>
        <div v-else-if="nav._id == 10022">
          <h1>{{ nav._name }}</h1>
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
        </div>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
import nav from "./_nav";
import ApiService from "@/core/services/api.service";
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
  beforeCreate() {
    ApiService.get(`users/whoami`).then((x) => {
      this.user = x.data._doc;
    });
  },
};
</script>

<style lang="scss" scoped>
</style>