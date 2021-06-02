<template>
  <v-container fluid>
    <component
      :is="componentId"
      _url="forum"
      v-on:save="save"
    >
    </component>
    <div class="alert">
      <v-alert v-if="alert" :type="alertType" transition="scale-transition">
        <v-row align="center">
          <v-col class="grow">
            {{ alertMessage }}
            <v-progress-linear
              v-if="alertType != 'success'"
              :buffer-value="100"
              :value="value"
              :width="100"
              color="amber"
            >
            </v-progress-linear>
          </v-col>
          <v-col class="shrink">
            <v-btn @click="() => {cancel = true; alert = false}" icon v-if="!cancel && alertType != 'success'">
              <v-icon> mdi-undo </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-alert>
    </div>
  </v-container>
</template>

<script>
import {
  GET_API_CATEGORY,
  PUT_API_CATEGORY,
} from "@/core/services/store/category.module";
export default {
  data() {
    return {
      componentId: "",
      alert: false,
      alertMessage: "Değişiklikler yaklaşık 10sn içerisinde uygulanacaktır.",
      alertType: "warning",
      value: 100,
      interval: {},
      cancel: false,
    };
  },
  components: {
    List: () => import("../categories/List"),
  },
  async created() {
    if (!this.$store.getters.getCategory)
      await this.$store.dispatch(GET_API_CATEGORY, "forum");
    this.componentId = "List";
  },
  methods: {
    save(payload) {
      this.alertMessage = "Değişiklikler yaklaşık 10sn içerisinde uygulanacaktır.",
      this.alertType = "warning",
      this.value = 100;
      this.alert = true;
      this.interval = setInterval(async () => {
        if (this.value === 0) {
          if (!this.cancel) {
            var result = await this.$store.dispatch(PUT_API_CATEGORY, payload);
            if (result == 200) {
              this.alertMessage = "Değişiklikler uygulanmıştır!";
              this.alertType = "success";
            } else {
              this.alertMessage = result.message;
              this.alertType = "error";
            }
          }
          setTimeout(() => {
            this.alert = false;
          }, 5000);
          clearInterval(this.interval);
        }
        this.value -= 10;
      }, 1000);
      this.cancel = false;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>