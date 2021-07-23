<template>
  <v-alert :type="type" elevation="2" transition="scale-transition">
    <v-row align="center">
      <v-col class="grow">
        {{
          $t(
            type == "warning"
              ? "message.add_content"
              : type == "success"
              ? "message.add_content_success"
              : "message.add_content_error",
            { name: msg, error: msg }
          )
        }}
        <v-progress-linear
          v-if="type == 'warning'"
          :buffer-value="100"
          :value="value"
          :width="100"
          color="amber"
          :indeterminate="loading"
        >
        </v-progress-linear>
      </v-col>
      <v-col class="shrink">
        <v-btn @click="clear()" icon v-if="!cancel && type != 'success'">
          <v-icon> mdi-undo </v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-alert>
</template>

<script>
export default {
  props: {
    _content: {
      type: Object,
      default: () => {},
    },
    _queue_id: {
      type: Number,
      default: -1,
    },
  },
  data() {
    return {
      interval: {},
      cancel: false,
      value: 100,
      type: "warning",
      msg: "",
      loading: false,
    };
  },
  created() {
    this.msg = this._content.msg;
    this.interval = setInterval(() => {
      if (this.value === 0) {
        this.loading = true;
        this.post();
        this.cancel = true;
      }
      if (this.value > 0) this.value -= 20;
    }, 1000);
  },
  methods: {
    clear() {
      this.cancel = true;
      clearInterval(this.interval);
      this.$store.dispatch("outQueue", this._queue_id);
    },
    async post() {
      if (!this.cancel) {
        var result = await this.$store.dispatch(
          this._content.func,
          this._content.item
        );
        if (result == 201) {
          this.type = "success";
          await this.$store.dispatch("resultQueue", {
            id: this._queue_id,
            result: true,
          });
        } else {
          this.msg = result;
          this.type = "error";
        }
        setTimeout(() => {
          this.clear();
        }, 2000);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>