<template>
  <div id="game" class="container">
    <div class="header">
      <h1>memory</h1>
      <button class="btn btn-primary">Menu</button>
    </div>
    <div class="game"></div>
    <FooterMulti />
    <FooterSolo />
  </div>
</template>

<script>
import FooterMulti from "../components/game/footers/FooterMulti.vue";
import FooterSolo from "../components/game/footers/FooterSolo.vue";

export default {
  name: "Game",
  components: { FooterMulti, FooterSolo },
  created() {
    this.generateCards();
  },
  computed: {
    selectedTheme() {
      return this.$store.state.theme;
    },
    selectedNumberOfPlayers() {
      return this.$store.state.numberOfPlayers;
    },
    selectedGridSize() {
      return this.$store.state.gridSize;
    },
  },
  methods: {
    generateCards() {
      let maxNumbers = 20;
      let maxArray = 8;
      let numbersArray = [];

      for (let i = 0; i < maxArray; i++) {
        let randomNumber = Math.floor(Math.random() * maxNumbers);
        numbersArray.push(randomNumber);
      }

      numbersArray = [...numbersArray, ...numbersArray];
      console.log(numbersArray);
    },
  },
};
</script>

<style lang="scss" scoped>
#game {
  //height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 1em;
  margin-bottom: 1em;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .btn {
      padding: 0.5em 1.25em;
    }
  }

  .footer {
    display: flex;
    flex-direction: row;
    gap: 1em;
  }
}
</style>
