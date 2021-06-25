<template>
  <v-speed-dial
    v-model="fab"
    :top="_top"
    :right="_right"
    :bottom="_bottom"
    :direction="_direction"
    :open-on-hover="_openOnHover"
    :transition="_transition"
  >
    <template v-slot:activator>
      <v-btn v-model="fab" dark fab>
        <v-icon v-if="fab"> mdi-close </v-icon>
        <v-icon v-else> mdi-plus </v-icon>
      </v-btn>
    </template>
    <slot></slot>
  </v-speed-dial>
</template>

<script>
export default {
    props: {
        _top: {
            type: Boolean,
            default: false
        },
        _right: {
            type: Boolean,
            default: false
        },
        _bottom: {
            type: Boolean,
            default: false
        },
        _left: {
            type: Boolean,
            default: false
        },
        _direction: {
            type: String,
            default: "left"
        },
        _openOnHover: {
            type: Boolean,
            default: false
        },
        _transition: {
            type: String,
            default: "slide-y-reverse-transition"
        }
    },
};
</script>

<style scoped>
.v-speed-dial {
  position: absolute;
}

.v-btn--floating {
  position: relative;
}
</style>