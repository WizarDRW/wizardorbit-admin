<template>
  <div class="w-100">
    <v-treeview :items="getDatas" :search="search" transition item-text="label">
      <template v-slot:prepend="{ item }">
        <v-card>
          <v-row>
            <v-col cols="3">
              <v-card-title>
                <v-icon>mdi-comment-text-outline</v-icon>
                {{ item.full_name }}
              </v-card-title>
              <v-card-subtitle>
                {{ item.email }}

                <p>{{ item.create_date }}</p>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      @click="solve(item.id)"
                      :color="item.is_solve == true ? `success` : ``"
                      icon
                      v-bind="attrs"
                      v-on="on"
                      ><v-icon>mdi-check</v-icon></v-btn
                    >
                  </template>
                  <span>Çözüm</span>
                </v-tooltip>
              </v-card-subtitle>
            </v-col>
            <v-col>
              <h3>İçerik</h3>
              <v-card-text>
                <div v-html="item.description"></div>
              </v-card-text>
            </v-col>
          </v-row>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-tooltip color="error" bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="error"
                  icon
                  @click="handleDelete(item.id)"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon> mdi-delete-outline </v-icon>
                </v-btn>
              </template>
              <span>Sil</span>
            </v-tooltip>
          </v-card-actions>
        </v-card>
      </template>
    </v-treeview>
  </div>
</template>

<script>
export default {
  props: {
    _datas: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      search: "",
      datas: [],
    };
  },
  created() {
    this.getDatas = this._datas;
  },
  computed: {
    getDatas: {
      get() {
        return this.datas;
      },
      set(val) {
        var arr = [];
        val.forEach((element) => {
          if (element.comment_id == 0) {
            arr.push({
              ...element,
              children: this.child(element.id, val),
            });
          }
        });
        this.datas = arr;
      },
    },
  },
  methods: {
    child(id, datas) {
      var arr = [];
      datas.forEach((element) => {
        if (element.comment_id == id) {
          arr.push({
            ...element,
            children: this.child(element.id, datas),
          });
        }
      });
      return arr;
    },
    solve(id) {
      for (let i = 0; i < this._datas.length; i++) {
        if (this._datas[i].id == id) this._datas[i].is_solve = true;
        else this._datas[i].is_solve = false;
      }
      this.getDatas = this._datas;
    },
    handleDelete(id) {
      var ids = [];
      for (let i = 0; i < this._datas.length; i++) {
        if (this._datas[i].id == id || this._datas[i].comment_id == id) {
          ids.push(this._datas[i].id);
        }
      }
      for (let i = 0; i < ids.length; i++) {
        this._datas.splice(
          this._datas.findIndex((x) => x.id == ids[i]),
          1
        );
      }
      this.getDatas = this._datas;
    },
  },
};
</script>

<style scoped>
.v-card {
  margin: 15px 0;
}
</style>