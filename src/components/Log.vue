<template>
  <div>
    <table v-if="_datas.length > 0">
      <thead>
        <tr width="100%">
          <th width="20%" align="start">İşlem</th>
          <th width="50%" align="start">Veri</th>
          <th width="20%" align="start">Tarih</th>
          <th width="10%"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in _datas" :key="index">
          <td>{{ item.process }}</td>
          <td>
            <v-sheet
              id="scrolling-techniques-3"
              class="overflow-y-auto"
              max-height="600"
            >
              <v-container style="height: 200px">
            <pre class="language-json"> {{ item.data }} </pre></v-container>
            </v-sheet>
          </td>
          <td>{{ item.date | moment("DD/MM/YYYY HH:mm") }}</td>
          <td>
            <v-btn icon @click="undo(item, index)">
              <v-icon> mdi-undo </v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </table>
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
      datas: [],
    };
  },
  created() {
    this.datas = this.$store.getters.getLog;
  },
  methods: {
    undo(item, index) {
      this.$emit("undo", { ...item, index: index });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>