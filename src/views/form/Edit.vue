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
        <v-card>
          <v-card-title><v-icon>mdi-shape</v-icon> Kategori</v-card-title>
          <v-card-text>
            <v-sheet>
              <v-container style="width: auto">
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
              </v-container>
            </v-sheet>
          </v-card-text>
        </v-card>
        <br />
        <v-card>
          <v-card-title><v-icon>mdi-semantic-web</v-icon> SEO</v-card-title>
          <v-card-text>
            <p><v-icon>mdi-format-title</v-icon> {{ form.name }}</p>
            <v-textarea
              v-model="form.short_description"
              outlined
              dense
              rows="3"
              label="Açıklama"
              placeholder="Açıklama"
              prepend-inner-icon="mdi-card-text-outline"
            ></v-textarea>
          </v-card-text>
        </v-card>
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
      ApiService.put(`forms/id/${this.form._id}`, this.form).then((x) => {
        if (x.status == 201) {
          this.$router.push({ path: "/write" });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>