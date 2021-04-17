<template>
  <div class="background">
    <h1>404</h1>
    <p>I have no memory of this page</p>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Nova+Oval&display=swap");
.background {
  background: linear-gradient(
      rgba(7, 0, 36, 0.651) 0%,
      rgba(255, 255, 255, 0.055) 100%
    ),
    url("../../assets/ihavenomemory.png");
  width: 100%;
  height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  text-align: center;
  font-size: 100px;
  font-family: "Nova Oval", cursive;
  text-transform: uppercase;
}
.background p {
  position: absolute;
  bottom: 15px;
  left: 6%;
  font-size: 90px;
}
</style>