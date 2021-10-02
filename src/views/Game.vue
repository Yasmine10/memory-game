<template>
  <div id="game" class="container">
    <div class="header">
      <h1>memory</h1>
      <button class="btn btn-primary">Menu</button>
    </div>
    <div class="game">
      <MemoryCards />
    </div>
    <!-- <FooterMulti /> -->
    <FooterSolo />
  </div>
</template>

<script>
import MemoryCards from "../components/game/GameBoard.vue";
// import FooterMulti from "../components/game/footers/FooterMulti.vue";
import FooterSolo from "../components/game/footers/FooterSolo.vue";

export default {
  name: "Game",
  components: {
    MemoryCards,
    // FooterMulti,
    FooterSolo,
  },
  created() {},
  computed: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
#game {
  height: 95vh;
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
