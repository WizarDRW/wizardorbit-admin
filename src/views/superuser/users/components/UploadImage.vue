<template>
  <div>
    <div
      class="drop display-inline align-center"
      @dragover.prevent
      @drop="onDrop"
    >
    
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onDrop(e) {
      e.stopPropagation();
      e.preventDefault();
      let files = e.dataTransfer.files;

      let file = files[0];

      let reader = new FileReader();
      reader.onload = (f) => {
        let src = f.target.result;
        this.$emit("image", src);
      };
      reader.readAsDataURL(file);
    },
  },
};
</script>

<style scoped>
.drop {
  border-radius: 2px;
  height: 100%;
  min-height: 400px;
  min-width: 600px;
  width: 100%;
}
</style>