<template>
  <v-subheader app>
    <div class="route">
      <a v-for="item in $route.matched" :key="item.path" :href="item.path">
        {{ item.name }} >
      </a>
    </div>
    <slot name="buttons"></slot>
  </v-subheader>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.route {
  display: inline;
  width: 100%;
}
.route a {
  color: #fff;
  text-decoration: none;
}
</style>