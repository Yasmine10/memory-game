<template>
  <div class="modal-wrapper">
    <div class="modal-container container">
      <div class="header">
        <h1>You did it!</h1>
        <h3>Game over! Here's how you got on&hellip;</h3>
      </div>
      <div class="main">
        <div class="time">
          <h3>Time Elapsed</h3>
          <p>{{ formatTime() }}</p>
        </div>
        <div class="moves">
          <h3>Moves Taken</h3>
          <p>{{ moves }} Moves</p>
        </div>
        <button class="btn btn-primary" @click.prevent="restartGame">Restart</button>
        <button class="btn btn-secondary" @click.prevent="newGame">Setup New Game</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EndGame",
  computed: {
    moves() {
      return this.$store.state.moves;
    },
    time() {
      return this.$store.state.time;
    },
  },
  methods: {
    restartGame() {
      this.$store.dispatch("restartGame").then(() => this.close());
    },
    newGame() {
      this.$router.push("/");
    },
    close() {
      this.$emit("close");
    },
    formatTime() {
      const time = this.time;

      const minutes = Math.floor(time / 60);
      let seconds = time % 60;
      if (seconds < 10) {
        seconds = `0${seconds}`;
      }

      return `${minutes}:${seconds}`;
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
    padding: 1.5rem;

    .header {
      text-align: center;
      margin-bottom: 1.25em;

      h1 {
        padding-top: 0.5em;
        padding-bottom: 0.5em;
      }
    }

    .main {
      display: flex;
      flex-direction: column;

      .time,
      .moves {
        background-color: var(--clr-secondary);

        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 0.3125rem;
        padding: 1em;
        margin-block: 0.25em;

        p {
          font-size: 1.25em;
          color: var(--clr-dark);
        }
      }

      .moves {
        margin-bottom: 1.5em;
      }

      button + button {
        margin-top: 1em;
      }

      .btn-secondary {
        font-size: 1.125em;
      }
    }

    h3 {
      font-size: 0.8125em;
    }
  }
}
</style>
