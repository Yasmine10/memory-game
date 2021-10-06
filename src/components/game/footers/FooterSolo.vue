<template>
  <div id="footer">
    <div class="time-left">
      <h3>Time</h3>
      <p class="number">{{ formatTime() }}</p>
    </div>
    <div class="moves">
      <h3>Moves</h3>
      <p class="number">{{ moves }}</p>
    </div>
  </div>
</template>

<script>
// import Timer from "../Timer.vue";

export default {
  name: "FooterSolo",
  components: {
    // Timer,
  },
  computed: {
    moves() {
      return this.$store.state.moves;
    },
    time() {
      // console.log(this.$store.state.time);
      return this.$store.state.time;
    }
  },
  methods: {
    formatTime() {
      const time = this.time;
    
      const minutes = Math.floor(this.time / 60);
      let seconds = time % 60;
      if (seconds < 10) {
        seconds = `0${seconds}`;
      }
    
      return `${minutes}:${seconds}`;
    },
  }
};
</script>

<style lang="scss" scoped>
#footer {
  display: flex;
  flex-direction: row;
  gap: 1em;
  text-align: center;

  .time-left,
  .moves {
    flex: 1;
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

  @media only screen and (min-width: 768px) {
    .time-left,
    .moves {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 1.5em;

      h3 {
        font-size: 1.125rem;
        margin-bottom: 0;
      }

      .number {
        font-size: 2rem;
      }
    }
  }
}
</style>
