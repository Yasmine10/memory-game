<template>
  <div class="modal-wrapper">
    <div class="modal-container container-medium">
      <div class="header">
        <h1>You did it!</h1>
        <h3>Game over! Here's how you got on&hellip;</h3>
      </div>
      <div class="main">
        <div class="time">
          <h3>Time Elapsed</h3>
          <p>{{ formatTime(this.time) }}</p>
        </div>
        <div class="moves">
          <h3>Moves Taken</h3>
          <p>{{ moves }} Moves</p>
        </div>
        <div class="btn-group">
          <button class="btn btn-primary" @click.prevent="restartGame">Restart</button>
          <button class="btn btn-secondary" @click.prevent="newGame">Setup New Game</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {format} from "../../../mixins/formatTime.js";

export default {
  name: "EndGame",
  mixins: [format],
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
    padding: 1.5rem;
    
    @media only screen and (min-width: 768px) {
      padding: 3rem;
    }

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
          font-size: 1.25rem;
          color: var(--clr-dark);
        }
      }

      .moves {
        margin-bottom: 1.5em;
      }
      
      .btn-group {
        display: flex;
        flex-direction: column;
        
        .btn + .btn {
          margin-left: 1em;
        }
  
        .btn-secondary {
          font-size: 1.125rem;
        }
      }
    }

    h3 {
      font-size: 0.8125rem;
    }
    
    @media only screen and (min-width: 767px) {
      h1 {
        font-size: 3rem;
      }
      
      h3 {
        font-size: 1.125rem;
      }
      
      .main {
        margin-top: 2.25em;
        
        .time, .moves {
          padding: 1.5em 1.75em;
          border-radius: 0.625rem;
          margin-block: 0.5em;
          
          p {
            font-size: 2rem;
          }
        }
        
        .btn-group {
          flex-direction: row;
          margin-top: 2em;
          
          .btn {
            padding: 0.5em 1.25em;
            font-size: 1.25rem;
            width: 100%;
          }
          
        }
      }
    }
  }
}
</style>
