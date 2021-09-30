<template>
  <div id="footer">
    <div class="wrapper" v-for="(player, index) in numberOfPlayers" :key="index">
      <div class="player active">
        <h3>P{{ index }}</h3>
        <p class="score">4</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FooterMulti",
  computed: {
    numberOfPlayers() {
      return this.$store.state.numberOfPlayers;
    },
  },
};
</script>

<style lang="scss" scoped>
#footer {
  display: flex;
  flex-direction: row;
  gap: 1em;

  .wrapper {
    flex: 1;
    text-align: center;

    .player {
      background-color: var(--clr-secondary);
      border-radius: 0.3125rem;
      padding: 1em 0;

      h3 {
        margin-bottom: 0.5em;
      }

      p {
        font-size: 1.5em;
      }
    }

    .active {
      background-color: var(--clr-primary);
      color: var(--clr-white);

      h3 {
        color: var(--clr-white);
      }
    }
  }
}
</style>
