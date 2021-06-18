<template>
  <div>
    <div v-if="_content.val">
      <v-text-field
        v-model="_content.width"
        label="Genişlik(px)"
        placeholder="Placeholder"
        outlined
        dense
        type="number"
        append-outer-icon="mdi-delete-variant"
        @click:append-outer="
          () => {
            $emit('delete_item');
          }
        "
      ></v-text-field>
      <v-hover v-slot="{ hover }">
        <v-img
          :aspect-ratio="16 / 9"
          :src="_content.val"
          :max-width="`${_content.width}px`"
        >
          <v-fade-transition mode="out-in">
            <div v-if="hover" class="">
              <v-btn
                @click="
                  () => {
                    image = null;
                    _content.val = null;
                  }
                "
                color="red"
                >Sil</v-btn
              >
            </div>
          </v-fade-transition>
        </v-img>
      </v-hover>
    </div>
    <v-file-input
      v-else
      v-model="image"
      label="Resim Ekle"
      outlined
      dense
      ref="image"
      accept="image/*"
      @change="onFilePicked"
      append-outer-icon="mdi-delete-variant"
      @click:append-outer="
        () => {
          $store.dispatch('deleteApiMultipart', _content.val);
          $emit('delete_item');
        }
      "
    ></v-file-input>
  </div>
</template>

<script>
export default {
  props: {
    _content: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      image: null,
    };
  },
  methods: {
    async onFilePicked(e) {
      var formData = new FormData();
      formData.append("photo", e);
      var id = await this.$store.dispatch("postApiMultipartChapter", formData);
      this._content.val = `https://drive.google.com/uc?export=view&id=${id}`;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>