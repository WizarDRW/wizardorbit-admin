<template>
    <div>
        <div class="fix-img-right">
            <img src="@/assets/gandalf-transparent.png" alt="gandalf">
        </div>
        <div class="center">
            <h1>403</h1>
            <p>You shall not pass</p>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Nova+Oval&display=swap');
.fix-img-right{
    position: fixed;
    right: 0;
    bottom: -5px;
}
.center{
    position: fixed;
    text-align: center;
    width: 100%;
    height: 100vh;
    font-size: 100px;
    font-family: 'Nova Oval', cursive;
    text-transform: uppercase;
}
</style>