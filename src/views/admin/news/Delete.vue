<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline dark lighten-2"> Dikkat!!! {{_name}} </v-card-title>

        <v-card-text
          >Silme işlemini onaylarsanız geriye dönüşü olmana bir işlem yapmış
          olacaksınız. Yazdığınız yazınız veritabanımızdan anlık
          silinmektedir.</v-card-text
        >

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <slot name="buttons">
            <v-btn color="success" text @click="dialog = false"> İptal </v-btn>
            <v-btn color="error" text @click="save()"> Sil </v-btn>
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
    _name: {
        type: String,
        default: ""
    }
  },
  data() {
    return {
      result: {
        status: false,
        msg: "Başarı ile değiştirildi.",
        type: "success",
      },
    };
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
        this.$emit("handleDelete");
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