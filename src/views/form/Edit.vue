<template>
  <v-container>
    <sub-header>
      <template v-slot:buttons>
        <div style="width: 100%; text-align: right">
          <v-btn icon color="red" @click="$router.push({ path: '/form' })">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-btn icon color="green" @click="save()">
            <v-icon>mdi-content-save-outline</v-icon>
          </v-btn>
        </div>
      </template>
    </sub-header>
    <v-row>
      <v-col md="3">
        <h2><v-icon>mdi-shape</v-icon> Kategori</h2>
        <v-treeview
          v-model="form.categories"
          :items="categories"
          :selection-type="selectionType"
          selectable
          return-object
          item-text="label"
          open-all
        >
          <template v-slot:prepend="{ item }">
            <v-icon>
              {{ item.icon }}
            </v-icon>
            {{ item.label }}
          </template>
        </v-treeview>
        <p></p>
        <h2><v-icon>mdi-semantic-web</v-icon> SEO</h2>
        <p></p>
        <v-text-field
          v-model="form.name"
          label="Başlık"
          placeholder="Başlık"
          outlined
          dense
          disabled
          prepend-inner-icon="mdi-format-title"
        ></v-text-field>
        <v-textarea
          v-model="form.short_description"
          outlined
          dense
          hide-details
          rows="3"
          label="Açıklama"
          placeholder="Açıklama"
          prepend-inner-icon="mdi-card-text-outline"
        ></v-textarea>
        <v-tooltip color="green" bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="success"
              icon
              v-bind="attrs"
              v-on="on"
              @click="
                () => {
                  tags.push({ key: '', tag: '' });
                }
              "
            >
              <v-icon> mdi-plus </v-icon>
            </v-btn>
          </template>
          <span>Etiket Ekle</span>
        </v-tooltip>
        <div v-for="(item, index) in form.tags" :key="item">
          <v-text-field
            v-model="item.key"
            label="Anahtar"
            placeholder="Anahtar"
            outlined
            dense
            hide-details
            prepend-inner-icon="mdi-key"
            prepend-icon="mdi-minus"
          >
            <template #prepend>
              <v-btn
                color="error"
                icon
                @click="
                  () => {
                    tags.splice(index, 1);
                  }
                "
              >
                <v-icon>mdi-minus</v-icon>
              </v-btn>
            </template>
          </v-text-field>
          <v-text-field
            v-model="item.tag"
            label="Etiket"
            placeholder="Etiket"
            outlined
            dense
            hide-details
            append-icon="mdi-tag-outline"
          ></v-text-field>
          <br />
        </div>
      </v-col>
      <v-col md="9">
        <v-text-field
          v-model="form.name"
          label="Başlık"
          placeholder="Başlık"
          outlined
          dense
          prepend-inner-icon="mdi-format-title"
        ></v-text-field>
        <tiptap :_content="form"></tiptap>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ApiService from "@/core/services/api.service.js";
import SubHeader from "@/layouts/header/SubHeader";
export default {
  components: {
    SubHeader,
    Tiptap: () => import("./components/Tiptap"),
  },
  data() {
    return {
      form: {},
      selectionType: "leaf",
      selection: [],
      categories: [],
    };
  },
  mounted() {
    ApiService.get(`formcategories/`).then((x) => {
      this.getForm();
      this.categories = x.data.map((x) => {
        return {
          id: x.id,
          label: x.label,
          icon: x.icon,
          children: x.children,
        };
      });
    });
  },
  methods: {
    getForm() {
      ApiService.get(`forms/id/${this.$route.params.id}`).then((x) => {
        this.form = x.data;
        this.loading = "none";
      });
    },
    save() {
      var data = this.form
      ApiService.put(`forms/id/${data._id}`, data).then((x) => {
        if (x.status == 201) {
          this.$router.push({ path: "/form" });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>