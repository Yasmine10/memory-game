<template>
  <div id="home">
    <div class="logo-container">
      <h1 class="white-logo">memory</h1>
    </div>
    <div class="menu-container container-medium">
      <form @submit.prevent="startGame">
        <section class="theme">
          <h3>Select Theme</h3>
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
              <input
                type="radio"
                id="icons"
                name="theme"
                value="icons"
                v-model="theme"
              />
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
              <input
                type="radio"
                id="4x4"
                name="gridSize"
                value="16"
                v-model="gridSize"
              />
              <label for="4x4">4x4</label>
            </div>
            <div class="btn-selection">
              <input
                type="radio"
                id="6x6"
                name="gridSize"
                value="36"
                v-model="gridSize"
              />
              <label for="6x6">6x6</label>
            </div>
          </div>
        </section>
        <button
          class="btn btn-primary btn-full-width"
          type="submit"
        >
          Start Game
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      theme: "",
      numberOfPlayers: 0,
      gridSize: 0,
    };
  },
  created() {
    this.$store.dispatch("stopTimer");
    this.theme = this.$store.state.theme;
    this.numberOfPlayers = this.$store.state.numberOfPlayers;
    this.gridSize = 16;
  },
  watch: {
    theme() {},
    numberOfPlayers() {},
    gridSize() {},
  },
  methods: {
    startGame() {
      this.$store
        .dispatch("newGame", {
          theme: this.theme,
          numberOfPlayers: this.numberOfPlayers,
          gridSize: this.gridSize,
        })
        .then(() => {
          this.$store.dispatch("setCards");
          this.$store.dispatch("shuffleCards");
          this.$store.dispatch(
            "setRemainingPairs",
            this.$store.getters["getCardPairs"]
          );
          this.$router.push("/game");
        });
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
    margin-bottom: 3.25em;

    .white-logo {
      font-size: 2rem;
      color: var(--clr-white);
    }

    @media only screen and (min-width: 768px) {
      margin-bottom: 4.25em;

      .white-logo {
        font-size: 2.5rem;
      }
    }
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
