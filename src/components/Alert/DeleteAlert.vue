<template>
  <v-alert
    v-if="alert"
    :type="type"
    elevation="2"
    transition="scale-transition"
  >
    <v-row align="center">
      <v-col class="grow">
        {{ msg }}
        <v-progress-linear
          v-if="type != 'success'"
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
    _msg: {
      type: String,
      default: "Değişiklikler yaklaşık 10sn içerisinde uygulanacaktır.",
    },
    _type: {
      type: String,
      default: "warning",
    },
    _second: {
      type: Number,
      default: 100,
    },
    _alert: {
      type: Boolean,
      default: false,
    },
    _func: {
      type: String,
      default: "",
    },
    _itemid: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      interval: {},
      cancel: false,
      value: 100,
      type: "warning",
      msg: "",
      loading: false
    };
  },
  created() {
    this.msg = this._msg;
    this.type = this._type;
    this.alert = this._alert;
    this.value = this._second;
    this.interval = setInterval(async () => {
      if (this.value === 0) {
        this.loading = true;
        this.deleteAsync();
        this.cancel = true;
      }
      this.value -= 10;
    }, 1000);
    this.cancel = false;
  },
  computed: {
    alert: {
      get() {
        return this._alert;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
  methods: {
    clear() {
      this.cancel = true;
      clearInterval(this.interval);
      this.alert = false;
    },
    async deleteAsync() {
      if (!this.cancel) {
        var result = await this.$store.dispatch(this._func, this._itemid);
        if (result == 200) {
          this.msg = "Değişiklikler uygulanmıştır!";
          this.type = "success";
        } else {
          this.msg = result.message;
          this.type = "error";
        }
        setTimeout(() => {
          this.$emit("deleted");
          this.clear();
        }, 2000);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>