<template>
  <div class="text-center">
    <div class="alert">
      <v-alert v-if="result.status" type="error">
        {{ result.msg }}
      </v-alert>
    </div>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline dark lighten-2">
          Şifre Sıfırlama
        </v-card-title>

        <v-card-text
          >Şifrenizi aylık olarak sıfırlamanızı öneririz.</v-card-text
        >

        <v-text-field
          v-model="password.key"
          :type="password.type ? 'password' : 'text'"
          :append-icon="password.type ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="password.type = !password.type"
          label="Şifre"
          placeholder="Şifre"
          outlined
          dense
          prepend-icon="mdi-lock-outline"
        ></v-text-field>
        <v-text-field
          v-model="password_confirm.key"
          :type="password_confirm.type ? 'password' : 'text'"
          :append-icon="password_confirm.type ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="password_confirm.type = !password_confirm.type"
          label="Şifre Onay"
          placeholder="Şifre Onay"
          outlined
          dense
          prepend-icon="mdi-lock-outline"
        ></v-text-field>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <slot name="buttons">
            <v-btn color="error" text @click="cancel()"> İptal </v-btn>
            <v-btn color="success" text @click="save()"> Sıfırla </v-btn>
          </slot>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>


<script>
import ApiService from "@/core/services/api.service.js";
import jwt_decode from "jwt-decode";
export default {
  props: {
    _dialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      password: {
        key: "",
        type: true,
      },
      password_confirm: {
        key: "",
        type: true,
      },
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
    password_view() {
      if (this.password.type == "password") {
        this.password.type = "text";
      } else {
        this.password.type = "password";
      }
    },
    password_confirm_view() {
      if (this.password_confirm.type == "password") {
        this.password_confirm.type = "text";
      } else {
        this.password_confirm.type = "password";
      }
    },
    save() {
      if (this.password.key == this.password_confirm.key) {
        var updateData = {
          password: this.password.key,
        };
        ApiService.post(
          `users/resetPassword/${
            jwt_decode(localStorage.getItem("id_token")).user_id
          }`,
          updateData
        ).then((x) => {
          if (x.status == 200) {
            this.result.status = true;
            this.dialog = false;
            setTimeout(() => {
              this.result.status = false;
            }, 3000);
          }
        });
      } else {
        this.result.status = true;
        this.result.msg = "Şifre uyumlu değil!";
        this.result.type = "warning";
        setTimeout(() => {
          this.result.status = false;
        }, 3000);
      }
    },
    cancel(){
      this.dialog = false
    }
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