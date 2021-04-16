<template>
  <div class="w-100">
    <v-treeview :items="get()" :search="search" transition item-text="label">
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
                <v-btn :color="item.is_solve == true ? `success` : `dark`" icon
                  ><v-icon>mdi-check</v-icon></v-btn
                >
                <v-btn icon><v-icon>mdi-thumb-up-outline</v-icon></v-btn>
                <v-btn icon><v-icon>mdi-thumb-down-outline</v-icon></v-btn>
              </v-card-subtitle>
            </v-col>
            <v-col>
              <h3>İçerik</h3>
              <v-card-text>
                <div v-html="item.description"></div>
              </v-card-text>
            </v-col>
          </v-row>
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
    };
  },
  methods: {
    get() {
      var arr = [];
      this._datas.forEach((element) => {
        if (element.comment_id == 0) {
          arr.push({
            ...element,
            children: this.child(element.id, this._datas),
          });
        }
      });
      return arr;
    },
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
  },
};
</script>

<style lang="scss" scoped>
.v-card {
  margin: 15px 0;
}
</style>