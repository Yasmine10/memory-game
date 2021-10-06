<template>
  <div class="modal-wrapper">
    <div class="modal-container container">
      <button class="btn btn-primary" @click.prevent="restartGame">Restart</button>
      <button class="btn btn-secondary" @click.prevent="newGame">New Game</button>
      <button class="btn btn-secondary" @click.prevent="close">Resume Game</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "MobileMenu",
  created() {
    this.$store.dispatch("isTimeRunning");
  },
  methods: {
    restartGame() {
      this.$store.dispatch("stopTimer");
      this.$store.dispatch("resetTimer");
      this.$store.dispatch("restartGame").then(() => {
        this.$store.dispatch("startTimer");
        this.close();
      });
    },
    newGame() {
      this.$store.dispatch("stopTimer");
      this.$store.dispatch("setCards");
      this.$store.dispatch("shuffleCards");
      this.$store.dispatch("setRemainingPairs", this.$store.getters["getCardPairs"]);
      this.$router.push("/");
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-wrapper {
  z-index: 1000;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: hsla(0, 0%, 0%, 0.5);

  display: flex;
  flex-direction: column;
  justify-content: center;

  .modal-container {
    background-color: var(--clr-light);
    border-radius: 0.9375rem;
    padding: 1.5em;

    display: flex;
    flex-direction: column;

    button + button {
      margin-top: 1em;
    }

    .btn-secondary {
      font-size: 1.125em;
    }
  }
}
</style>
