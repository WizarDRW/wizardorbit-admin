<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline dark lighten-2"> {{$t('message.warning')}}!!! </v-card-title>

        <v-card-text
          >{{$t('message.delete_message')}}</v-card-text
        >

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <slot name="buttons">
            <v-btn color="success" text @click="dialog = false"> {{$t('message.cancel')}} </v-btn>
            <v-btn color="error" text @click="save()"> {{$t('message.delete')}} </v-btn>
          </slot>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>


<script>
export default {
  props: {
    _dialog: {
      type: Boolean,
      default: false,
    },
    _id: {
        type: String,
        default: ""
    }
  },
  computed: {
    dialog: {
      get() {
        return this._dialog;
      },
      set(value) {
        this.$emit("dialogClose", value);
      },
    },
  },
  methods: {
    save() {
        this.$emit("handleDelete", this._id);
        this.dialog = false;
    },
  },
};
</script>

<style lang="css">
.alert {
  position: absolute;
  right: 5px;
  top: 5px;
  z-index: 999;
}
</style>