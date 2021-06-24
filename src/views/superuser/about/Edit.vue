<template>
  <v-container>
    <sub-header>
      <template v-slot:buttons>
        <div style="width: 100%; text-align: right">
          <v-btn
            :disabled="loading"
            icon
            color="red"
            @click="$router.push({ name: 'About' })"
          >
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-btn :loading="loading" icon color="green" @click="handleSave()">
            <v-icon>mdi-content-save-outline</v-icon>
          </v-btn>
        </div>
      </template>
    </sub-header>
    <v-container>
      <!-- İçerikler -->
      <div v-for="(item, index) in about.descriptions" :key="index">
        <!-- Card Title -->
        <div v-if="item.type == 'v-card-title'">
          <v-text-field
            v-model="item.val"
            label="Kart Başlığı"
            placeholder="Kart Başlığı"
            append-icon="mdi-delete-variant"
            @click:append="
              () => {
                about.descriptions.splice(index, 1);
              }
            "
            solo
          ></v-text-field>
        </div>
        <!-- Card Subtitle -->
        <div v-if="item.type == 'v-card-subtitle'">
          <v-text-field
            v-model="item.val"
            label="Kart Destek Başlığı"
            placeholder="Kart Destek Başlığı"
            append-icon="mdi-delete-variant"
            @click:append="
              () => {
                about.descriptions.splice(index, 1);
              }
            "
            solo
          ></v-text-field>
        </div>
        <!-- Card Text -->
        <div v-if="item.type == 'v-card-text'">
          <v-textarea
            v-model="item.val"
            label="Kart Metni"
            placeholder="Kart Metni"
            append-icon="mdi-delete-variant"
            @click:append="
              () => {
                about.descriptions.splice(index, 1);
              }
            "
            solo
          ></v-textarea>
        </div>
        <!-- Markdown üst butonları -->
        <div v-if="item.type == 'markdown'">
          <markdown
            :_content="item"
            v-on:delete_item="
              () => {
                about.descriptions.splice(index, 1);
              }
            "
          ></markdown>
        </div>
        <!-- Code editor içeriği -->
        <div v-if="item.type == 'code'">
          <code-block
            :_code="item"
            v-on:delete_item="
              () => {
                about.descriptions.splice(index, 1);
              }
            "
          ></code-block>
        </div>
        <!-- Tiptap içeriği -->
        <div v-if="item.type == 'tiptap'">
          <tiptap
            :_content="item"
            v-on:delete_item="
              () => {
                about.descriptions.splice(index, 1);
              }
            "
          ></tiptap>
        </div>
        <!-- Resim içeriği -->
        <div v-if="item.type == 'image'">
          <image-block
            :_content="item"
            v-on:delete_item="
              () => {
                about.descriptions.splice(index, 1);
              }
            "
          ></image-block>
        </div>
        <br />
      </div>

      <!-- Content ekleme butonu -->
      <v-menu offset-y>
        <template v-slot:activator="{ on: menu, attrs }">
          <v-tooltip top>
            <template v-slot:activator="{ on: tooltip }">
              <v-btn icon v-bind="attrs" v-on="{ ...tooltip, ...menu }">
                <v-icon> mdi-plus </v-icon>
              </v-btn>
            </template>
            <span>Ekle</span>
          </v-tooltip>
        </template>
        <v-list>
          <v-list-item
            link
            @click="
              about.descriptions.push({
                sort: about.descriptions.length - 1,
                type: 'v-card-title',
                val: '',
              })
            "
          >
            <v-list-item-action> Kart Başlığı </v-list-item-action>
          </v-list-item>
          <v-list-item
            link
            @click="
              about.descriptions.push({
                sort: about.descriptions.length - 1,
                type: 'v-card-subtitle',
                val: '',
              })
            "
          >
            <v-list-item-action> Kart Destek Başlığı </v-list-item-action>
          </v-list-item>
          <v-list-item
            link
            @click="
              about.descriptions.push({
                sort: about.descriptions.length - 1,
                type: 'v-card-text',
                val: '',
              })
            "
          >
            <v-list-item-action> Kart Metni </v-list-item-action>
          </v-list-item>
          <v-list-item
            link
            @click="
              about.descriptions.push({
                sort: about.descriptions.length - 1,
                type: 'markdown',
                val: '',
              })
            "
          >
            <v-list-item-action> Markdown </v-list-item-action>
          </v-list-item>
          <v-list-item
            link
            @click="
              about.descriptions.push({
                sort: about.descriptions.length - 1,
                type: 'code',
                lang: { id: 'js', name: 'javascript' },
                val: '',
              })
            "
          >
            <v-list-item-action> Code </v-list-item-action>
          </v-list-item>
          <v-list-item
            link
            @click="
              about.descriptions.push({
                sort: about.descriptions.length - 1,
                type: 'tiptap',
                val: '',
              })
            "
          >
            <v-list-item-action> Tiptap </v-list-item-action>
          </v-list-item>
          <v-list-item
            link
            @click="
              about.descriptions.push({
                sort: about.descriptions.length - 1,
                type: 'image',
                val: '',
                width: 500,
              })
            "
          >
            <v-list-item-action> Image </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-container>
    <div class="alerts">
      <update-alert
        v-if="update.status"
        v-on:input="
          (val) => {
            loading = val;
            update.status = val;
          }
        "
        :_msg="update.msg"
        :_type="update.type"
        :_second="update.second"
        :_alert="update.status"
        :_func="update.func"
        :_item="update.item"
        v-on:added="save"
      ></update-alert>
    </div>
  </v-container>
</template>

<script>
export default {
  components: {
    Markdown: () => import("@/components/Markdown"),
    Tiptap: () => import("@/components/Tiptap"),
    CodeBlock: () => import("@/components/Code"),
    ImageBlock: () => import("@/components/Image"),
    UpdateAlert: () => import("@/components/Alert/UpdateAlert"),
    SubHeader: () => import(`@/layouts/header/SubHeader`),
  },
  data() {
    return {
      about: {
        descriptions: [],
        option: {},
      },
      update: {
        status: false,
        msg: "Ekleme işlemi yaklaşık 10sn içinde gerçekleşecektir.",
        second: 100,
        type: "warning",
        func: "postApiRelease",
        item: {},
      },
      isSave: false,
    };
  },
  async created() {
      if(!this.$store.getters.getAbout) await this.$store.dispatch("getApiAbout", this.$route.params.id);
      this.about = this.$store.getters.getAbout;
  },
  methods: {
    handleSave() {
      this.loading = true;
      this.update.item = this.about;
      this.update.second = 100;
      this.update.status = true;
    },
    async save() {
      this.isSave = true;
      this.$router.push({ name: "About" });
    },
  },
};
</script>

<style lang="">
</style>