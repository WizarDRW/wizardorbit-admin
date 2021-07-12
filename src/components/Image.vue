<template>
  <div>
    <div v-if="_content.val">
      <v-text-field
        v-model="_content.width"
        :label="$t('message.width') + '(px)'"
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
          lazy-src="https://drive.google.com/uc?export=view&id=1K9QSSEMfJ4uTvixQKGDI9EDqUk_F4MjW"
          :max-width="`${_content.width}px`"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              ></v-progress-circular>
              {{ $t("message.loading") }}...
            </v-row>
          </template>
          <v-fade-transition mode="out-in">
            <div v-if="hover" class="">
              <v-btn
                @click="
                  () => {
                    if (_content.val != _defaultImage.val)
                      $store.dispatch('deleteApiMultipart', _content.val);
                    image = null;
                    _content.val = null;
                  }
                "
                color="red"
                tile
                >{{ $t("message.deleteImage") }}</v-btn
              >
            </div>
          </v-fade-transition>
        </v-img>
      </v-hover>
    </div>
    <v-file-input
      v-else
      v-model="image"
      :label="$t('message.addImage')"
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
    _defaultImage: {
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
      var id = await this.$store.dispatch("postApiMultipart", formData);
      this._content.val = `https://drive.google.com/uc?export=view&id=${id}`;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>