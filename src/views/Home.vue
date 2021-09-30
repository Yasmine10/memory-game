<template>
    <div id="home">
        Home
        <button class="btn btn-primary" type="submit" @click="startGame">
            Start Game
        </button>
    </div>
</template>

<script>
export default {
    name: "Home",
    components: {},
    methods: {
        startGame() {
            this.$router.push("/game");
        },
    },
};
</script>

<style lang="scss" scoped></style>
