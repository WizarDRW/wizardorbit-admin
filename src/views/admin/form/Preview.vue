<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="1000">
      <v-card>
        <v-card-title class="headline dark lighten-2">
          <v-badge
            :color="
              _form.status == 'Published'
                ? 'green'
                : _form.status == 'Block'
                ? 'red'
                : 'orange'
            "
            :content="_form.status == 'Published' ? 'Yayında':_form.status == 'Block' ? 'Bloklandı':'Onay Bekliyor'"
            >Önizleme
          </v-badge></v-card-title
        >

        <v-img :src="_form.image_path"></v-img>
        <v-card-text></v-card-text>

        <v-divider></v-divider>
        <div v-html="_form.description"></div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <slot name="buttons">
            <v-btn color="warning" text @click="dialog = false"> Kapat </v-btn>

            <v-btn
              v-if="_form.status == 'Published'"
              color="error"
              text
              @click="save()"
            >
              Bloke Koy!
            </v-btn>
            <v-btn
              v-else-if="_form.status == 'Block'"
              color="success"
              text
              @click="save()"
            >
              Bloke Kaldır
            </v-btn>
            <v-btn
              v-else-if="_form.status == 'ModeratorAcceping'"
              color="success"
              text
              @click="save()"
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
  methods: {},
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