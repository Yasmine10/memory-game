<template>
  <div id="home">
    <div class="logo-container">
      <Logo />
    </div>
    <div class="menu-container container">
      <form @submit.prevent="startGame">
        <section class="theme">
          <h3>Theme</h3>
          <div class="flex">
            <div class="btn-selection">
              <input
                type="radio"
                id="numbers"
                name="theme"
                value="numbers"
                v-model="theme"
              />
              <label for="numbers">Numbers</label>
            </div>
            <div class="btn-selection">
              <input type="radio" id="icons" name="theme" value="icons" v-model="theme" />
              <label for="icons">Icons</label>
            </div>
          </div>
        </section>
        <!--
        <section class="number-of-players">
          <h3>Number of Players</h3>
          <div class="flex">
            <div class="btn-selection">
              <input
                type="radio"
                id="one"
                name="numberOfPlayers"
                value="1"
                v-model="numberOfPlayers"
              />
              <label for="one">1</label>
            </div>
            <div class="btn-selection">
              <input
                type="radio"
                id="two"
                name="numberOfPlayers"
                value="2"
                v-model="numberOfPlayers"
              />
              <label for="two">2</label>
            </div>
            <div class="btn-selection">
              <input
                type="radio"
                id="three"
                name="numberOfPlayers"
                value="3"
                v-model="numberOfPlayers"
              />
              <label for="three">3</label>
            </div>
            <div class="btn-selection">
              <input
                type="radio"
                id="four"
                name="numberOfPlayers"
                value="4"
                v-model="numberOfPlayers"
              />
              <label for="four">4</label>
            </div>
          </div>
        </section>
        -->
        <section class="grid-size">
          <h3>Grid Size</h3>
          <div class="flex">
            <div class="btn-selection">
              <input type="radio" id="4x4" name="gridSize" value="4" v-model="gridSize" />
              <label for="4x4">4x4</label>
            </div>
            <div class="btn-selection">
              <input type="radio" id="6x6" name="gridSize" value="6" v-model="gridSize" />
              <label for="6x6">6x6</label>
            </div>
          </div>
        </section>
        <button class="btn btn-primary btn-full-width" type="submit" @click="startGame">
          Start Game
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import Logo from "../components/icons/LogoLight.vue";

export default {
  name: "Home",
  components: {
    Logo,
  },
  data() {
    return {
      theme: "",
      numberOfPlayers: 0,
      gridSize: 4,
    };
  },
  created() {
    this.theme = this.$store.state.theme;
    this.numberOfPlayers = this.$store.state.numberOfPlayers;
    this.gridSize = this.$store.state.gridSize;
  },
  watch: {
    theme(value) {
      console.log(value);
    },
    numberOfPlayers(value) {
      console.log(value);
    },
    gridSize(value) {
      console.log(value);
    },
  },
  methods: {
    startGame() {
      this.$store
        .dispatch("newGame", {
          theme: this.theme,
          numberOfPlayers: this.numberOfPlayers,
          gridSize: this.gridSize,
        })
        .then(() => this.$router.push("/game"));
    },
  },
};
</script>

<style lang="scss" scoped>
#home {
  background-color: var(--clr-extra-dark);
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;

  .logo-container {
    text-align: center;
    margin-bottom: 2rem;
  }

  .menu-container {
    background-color: var(--clr-white);
    border-radius: 0.9375rem;
    padding: 1.5em;

    .flex {
      display: flex;
      margin-bottom: 2em;
    }
  }
}
</style>
