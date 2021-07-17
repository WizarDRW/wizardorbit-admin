<template>
  <v-container>
    <sub-header>
      <template v-slot:buttons>
        <div style="width: 100%; text-align: right">
          <v-tooltip color="green" bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                :disabled="log.length == 0"
                v-bind="attrs"
                v-on="on"
                color="green"
                @click="() => $emit('save', datas)"
              >
                <v-icon>mdi-content-save-outline</v-icon>
              </v-btn>
            </template>
            <span>{{ $t("keywords.save") }}</span>
          </v-tooltip>
        </div>
      </template>
    </sub-header>
    <v-row>
      <v-col cols="4">
        <c-treeview
          v-model="selectedCategories"
          :items="getCategories"
          selection-type="independent"
          :search="search"
          hoverable
          open-on-click
          selected-color="success"
          :item-text="`label[${$store.getters.getLangName}]`"
          return-object
          dense
          :open-all="open"
        >
          <template v-slot:prepend="{ item }">
            <v-icon>
              {{ item.icon }}
            </v-icon>
            {{ item.label[$store.getters.getLangName] }}
          </template>
          <template v-slot:append="{ item, hover }">
            <div class="inline">
              <v-icon
                v-if="hover"
                class="appendRight"
                color="primary"
                @click="
                  () => {
                    dialog = true;
                    data = item;
                    process = 'edit';
                  }
                "
                >mdi-circle-edit-outline</v-icon
              >
              <v-icon
                v-if="hover && item.children"
                class="appendRight"
                color="success"
                @click="
                  () => {
                    dialog = true;
                    data = {
                      id: item.id + '-' + item.children.length,
                      label: item.label + '-' + item.children.length,
                      icon: item.icon,
                      children: [],
                    };
                    addItem = item;
                    process = 'createChild';
                  }
                "
                >mdi-plus</v-icon
              >
              <v-icon
                v-if="hover"
                color="error"
                class="appendRight"
                @click="handleDelete(item)"
                >mdi-minus</v-icon
              >
            </div>
          </template>
        </c-treeview>
        <v-icon
          class="appendRight"
          color="success"
          @click="
            () => {
              dialog = true;
              data = {
                id: `${datas.categories.length}`,
                label: datas.categories.length,
                icon: 'icon',
                children: [],
              };
              addItem = data;
              process = 'createParent';
            }
          "
          >mdi-plus</v-icon
        >
      </v-col>
      <v-col cols="8">
        <log :_datas="log" v-on:undo="undo"></log>
      </v-col>
    </v-row>
    <content-edit
      v-if="dialog"
      :_dialog="dialog"
      :_item="data"
      :_process="process"
      v-on:dialogClose="(value) => (dialog = value)"
      v-on:edit="handleEdit"
      v-on:createChild="handleAddChild"
      v-on:createParent="handleAdd"
    ></content-edit>
  </v-container>
</template>


<script>
import {
  GET_API_CATEGORY,
  SELECT_CATEGORIES,
} from "@/core/services/store/category.module";
import { LOG, POST_API_LOG } from "../../../core/services/store/log.module";
export default {
  name: "SuperUserCategoryList",
  components: {
    SubHeader: () => import("@/layouts/header/SubHeader"),
    ContentEdit: () => import("./ContentEdit"),
    CTreeview: () => import("@/mixins/CTreeview"),
    Log: () => import("@/components/Log"),
  },
  props: {
    _url: {
      type: String,
      default: "chapter",
    },
  },
  data() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      open: false,
      headers: [
        {
          text: "Icon",
          value: "icon",
          width: "75",
        },
        {
          text: "Başlık",
          value: "label",
        },
        {
          text: "",
          value: "actions",
          align: "right",
          sortable: false,
        },
      ],
      loading: true,
      deleteDialog: false,
      deleteRes: {
        label: "",
        id: "",
        index: -1,
      },
      dialog: false,
      data: {},
      datas: {},
      addItem: {},
      newChanges: [],
      search: "",
      select: [],
      log: [],
      process: "",
    };
  },
  async mounted() {
    if (this.$store.getters.getCategory.type !== this._url)
      await this.$store.dispatch(GET_API_CATEGORY, this._url);
    this.datas = { ...this.$store.getters.getCategory };
    this.orjDatas = { ...this.$store.getters.getCategory };
    if (this.datas) this.loading = false;
  },
  methods: {
    /**
     * Kategori parent ekleme
     * @param {Object} items Parent a eklenen obje
     */
    handleAdd(payload) {
      this.datas.categories.push(payload.data);
      this.addlog(payload.process, payload.data);
    },
    /**
     * Child olarak ekleme
     * @param {Object} payload Child a eklenen obje
     */
    handleAddChild(payload) {
      this.addItem.children.push(payload.data);
      this.addlog(payload.process, payload.data);
    },
    /**
     * Itemin güncellenmesi
     * @param {String} payload Log için güncellenen verinin ne türde olduğu
     */
    handleEdit(payload) {
      this.data.label = payload.data.newdata.label;
      this.data.icon = payload.data.newdata.icon;
      this.addlog(payload.process, payload.data);
    },
    /**
     * Parent itemin silinmesi
     * @param {Object} item Parent itemin silinmesi için gönderilen item
     */
    handleDelete(item) {
      this.datas.categories.forEach((element, index) => {
        if (element.id == item.id) {
          this.datas.categories.splice(index, 1);
        } else {
          if (element.children) {
            this.handleDeleteChild(element.children, item);
          }
        }
      });
      this.addlog("Delete", item);
    },
    /**
     * Child itemin silinmesi
     * @param {Object} datas Gönderilen bütün childrenlar.
     * @param {Object} item Child itemin silinmesi için gönderilen item
     */
    handleDeleteChild(datas, item) {
      datas.forEach((element, index) => {
        if (element.id == item.id) {
          datas.splice(index, 1);
        } else {
          if (element.children) {
            this.handleDeleteChild(element.children, item);
          }
        }
      });
    },
    /**
     * Log ekleme
     * @param {String} process İşlem tipini belirtir
     * @param {Object} item İşlemin hangi item üzerinde olduğunu belirtir
     */
    addlog(process, item) {
      this.log.push({
        process: process,
        type: {
          id: this.datas._id,
          content: "ChapterCategory",
        },
        date: new Date(),
        data: item,
      });
      this.log.sort((a, b) => b.date - a.date);
      this.$store.dispatch(LOG, this.log);
    },
    /**
     * Geri alma işlemleri
     */
    undo(payload) {
      if (payload.process == "Update") {
        const idPath = payload.data.olddata.id.split("-");
        this.getCategories.forEach((el) => {
          if (idPath[0] === el.id) {
            if (idPath.length === 1) {
              el.label = payload.data.olddata.label;
              el.icon = payload.data.olddata.icon;
              this.log.splice(payload.index, 1);
            } else {
              idPath.splice(0, 1);
              this.undoChild(
                payload.process,
                el.children,
                payload.data.olddata,
                idPath,
                payload.index
              );
            }
          }
        });
      } else if (payload.process == "Add") {
        const idPath = payload.data.id.split("-");
        this.datas.categories.forEach((el, i) => {
          if (idPath[0] == el.id) {
            idPath.splice(0, 1);
            if (idPath.length < 1) {
              this.datas.categories.splice(i, 1);
              this.log.splice(payload.index, 1);
            } else {
              this.undoChild(
                payload.process,
                el,
                payload.data,
                idPath,
                payload.index
              );
            }
          }
        });
      } else {
        const idPath = payload.data.id.split("-");
        idPath.splice(idPath.length - 1, 1);
        if (idPath.length == 0) {
          this.datas.categories.push(payload.data);
          this.log.splice(payload.index, 1);
        } else
          this.datas.categories.forEach((el) => {
            if (idPath[0] === el.id) {
              idPath.splice(0, 1);
              this.undoChild(
                payload.process,
                el,
                payload.data,
                idPath,
                payload.index
              );
            }
          });
      }
    },
    undoChild(process, datas, data, idPath, index) {
      if (process == "Update") {
        datas.forEach((el) => {
          var id = el.id.split("-");
          if (idPath[0] === id[id.length - 1]) {
            if (idPath.length === 1) {
              el.label = data.label;
              el.icon = data.icon;
              this.log.splice(index, 1);
            } else {
              idPath.splice(0, 1);
              this.undoChild(process, el.children, data, idPath, index);
            }
          }
        });
      } else if (process == "Add") {
        datas.children.forEach((el, i) => {
          var id = el.id.split("-");
          if (idPath[0] == id[id.length - 1]) {
            idPath.splice(0, 1);
            if (idPath.length < 1) {
              datas.children.splice(i, 1);
              this.log.splice(index, 1);
            } else {
              this.undoChild(process, el, data, idPath, index);
            }
          }
        });
      } else {
        if (idPath.length < 1) {
          datas.children.push(data);
          this.log.splice(index, 1);
        } else {
          datas.children.forEach((el) => {
            var id = el.id.split("-");
            if (idPath[0] === id[id.length - 1]) {
              idPath.splice(0, 1);
              this.undoChild(process, el, data, idPath, index);
            }
          });
        }
      }
    },
  },
  computed: {
    /**
     * Seçilen kategoriler bu triger da döner.
     */
    selectedCategories: {
      get() {
        return this.select;
      },
      set(value) {
        this.$store.dispatch(SELECT_CATEGORIES, value);
        this.select = value;
      },
    },
    getCategories: {
      get() {
        return this.datas.categories;
      },
      set(value) {
        this.datas.categories = value;
      },
    },
  },
  destroyed() {
    if (this.log.length > 0) {
      var data = {
        user_id: this.$store.getters.currentUser._id,
        title: `${this._url}category`,
        datas: [...this.log],
      };
      this.$store.dispatch(POST_API_LOG, data);
    }
  },
};
</script>


<style scoped>
.inline {
  display: inline-flex;
  flex-wrap: nowrap;
}
</style>