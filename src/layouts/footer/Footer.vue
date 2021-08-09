<template>
  <v-footer fixed>
    <v-spacer></v-spacer>
    <span>
      <i>
        {{ userAgent }}
      </i>
    </span>
  </v-footer>
</template>

<script>
export default {
  data() {
    return {
      userAgent: null,
    };
  },
  created() {
    this.userAgent = this.$browserDetect.meta.ua;
  },
};
</script>

<style lang="">
</style>