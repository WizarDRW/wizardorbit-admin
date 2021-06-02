<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="1000">
      <v-card>
        <v-card-title class="headline dark lighten-2">
          <v-badge
            :color="
              form.status == 'Published'
                ? 'green'
                : form.status == 'Block'
                ? 'red'
                : 'orange'
            "
            :content="
              form.status == 'Published'
                ? 'Yayında'
                : form.status == 'Block'
                ? 'Bloklandı'
                : 'Onay Bekliyor'
            "
            >Önizleme
          </v-badge></v-card-title
        >

        <v-card-text></v-card-text>

        <v-divider></v-divider>
        <div v-html="form.description"></div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <slot name="buttons">
            <v-btn color="warning" text @click="dialog = false"> Kapat </v-btn>
            <v-btn
              v-if="form.status == 'Published'"
              color="error"
              text
              @click="process('Block')"
            >
              Bloke Koy!
            </v-btn>
            <v-btn
              v-else-if="form.status == 'Block'"
              color="success"
              text
              @click="process('Published')"
            >
              Bloke Kaldır
            </v-btn>
            <v-btn
              v-else-if="form.status == 'ModeratorAcceping'"
              color="success"
              text
              @click="process('Published')"
            >
              Yayına Al
            </v-btn>
          </slot>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>


<script>
import ApiService from "@/core/services/api.service.js";
export default {
  props: {
    _dialog: {
      type: Boolean,
      default: false,
    },
    _name: {
      type: String,
      default: "",
    },
    _form: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      result: {
        status: false,
        msg: "Başarı ile değiştirildi.",
        type: "success",
      },
      form: {},
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
  updated() {
    this.form = this._form;
  },
  methods: {
    process(value) {
      this.form.status = value;
      ApiService.put(`forms/id/${this.form._id}`, this.form);
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