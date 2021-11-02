<template>
  <div id="memorycards">
    <div
      class="cards-list"
      :class="{
        'cards-list-small': gridSize === 16,
        'cards-list-large': gridSize === 36,
      }"
    >
      <div
        class="card-item"
        v-for="card in cards"
        :key="card.position"
        :class="{
          flipped: card.flipped,
          matched: card.matched,
          selected: card.flipped & !card.matched,
        }"
        @click="flipCard(card)"
      >
        <div class="front" v-if="theme === 'icons'">
          <p class="icon">
            <font-awesome-icon
              :icon="['fas', card.value]"
            />
          </p>
        </div>
        <div class="front" v-else>
          <span>{{ card.value }}</span>
        </div>
        <div class="back"></div>
      </div>
    </div>
    <EndGame v-if="showEndGame" @close="showEndGame = false" />
  </div>
</template>

<script>
import EndGame from "./modals/EndGame.vue";

export default {
  name: "GameBoard",
  components: {
    EndGame,
  },
  data() {
    return {
      showEndGame: false,
    };
  },
  created() {
    this.showEndGame = true;
  },
  computed: {
    theme() {
      return this.$store.state.theme;
    },
    gridSize() {
      return this.$store.state.gridSize;
    },
    moves() {
      return this.$store.state.moves;
    },
    cards() {
      return this.$store.state.cards;
    },
    cardsFlipped: {
      get() {
        return this.$store.state.cardsFlipped;
      },
      set(value) {
        this.$store.dispatch("setCardFlipped", value);
      }
    },
    numberOfCardsFlipped: {
      get() {
        return this.$store.state.numberOfCardsFlipped;
      },
      set(value) {
        this.$store.dispatch("setNumberOfCardsFlipped", value);
      }
    },
    remainingPairs: {
      get() {
        return this.$store.state.remainingPairs;
      },
      set(value) {
        this.$store.dispatch("setRemainingPairs", value);
      }
      
    },
  },
  methods: {
    flipCard(card) {

      if(card.flipped) {
        return;
      }
      
      // check if there are less than 2 flipped cards, then flip card
      if (this.numberOfCardsFlipped < 2) {
        this.numberOfCardsFlipped = this.numberOfCardsFlipped + 1;
        this.$store.dispatch("setNumberOfCardsFlipped", this.numberOfCardsFlipped);

        this.$store.dispatch("setCardFlipped", {
          position: card.position,
          flipped: true,
        });

        this.$store.dispatch("setCardsFlipped", {
          id: card.id,
          position: card.position,
        });

        // when 2 cards are flipped, check if match
        if (
          this.numberOfCardsFlipped === 2 &&
          this.cardsFlipped[0].id === this.cardsFlipped[1].id
        ) {
          // set card.matched to true when the cards match
          this.$store.dispatch("setCardsMatched", {
            card1: {
              position: this.cardsFlipped[0].position,
            },
            card2: {
              position: this.cardsFlipped[1].position,
            },
          });

          this.numberOfCardsFlipped = 0;
          this.$store.dispatch("setNumberOfCardsFlipped", this.numberOfCardsFlipped);
          this.cardsFlipped.length = 0;
          this.$store.dispatch("resetCardsFlipped");
          this.$store.dispatch("setMoves", 2);
          this.remainingPairs = this.remainingPairs - 1;
          this.$store.dispatch("setRemainingPairs", this.remainingPairs);

          // when no match, flip cards back
        } else if (
          this.numberOfCardsFlipped === 2 &&
          this.cardsFlipped[0].id !== this.cardsFlipped[1].id
        ) {
          // timeout because otherwise the user can't see the second card
          // because it will be immediatly flipped back with the setCardFlipped dispatch
          setTimeout(() => {
            for (let i = 0; i < this.cards.length; i++) {
              if (this.cards[i].flipped && !this.cards[i].matched) {
                this.$store.dispatch("setCardFlipped", {
                  position: this.cards[i].position,
                  flipped: false,
                });
              }
            }
          }, 900);

          this.numberOfCardsFlipped = 0;
          this.$store.dispatch("setNumberOfCardsFlipped", this.numberOfCardsFlipped);
          this.cardsFlipped.length = 0;
          this.$store.dispatch("resetCardsFlipped");
          this.$store.dispatch("setMoves", 2);
        }
      }

      if (this.remainingPairs === 0) {
        setTimeout(() => {
          this.showEndGame = true;
          this.$store.dispatch("stopTimer");
        }, 1200 );
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#memorycards {
  width: 100%;
  .cards-list {
    display: grid;
    justify-content: center;

    .card-item {
      width: 100%;
      //perspective: 1000;
      cursor: pointer;

      display: flex;
      justify-content: center;
      align-items: center;
      align-content: center;

      .front,
      .back {
        backface-visibility: hidden;
        transition: 0.6s;
        transform-style: preserve-3d;

        position: absolute;
        content: "";

        border-radius: 50%;
        text-align: center;
      }

      .front {
        background-color: var(--clr-neutral-light-grey);
        transform: rotateY(-180deg);

        .icon {
          color: var(--clr-white);
        }

        span {
          color: var(--clr-white);
        }
      }

      .back {
        background-color: var(--clr-extra-dark);

        transform: rotateY(0deg);
        position: absolute;
      }

      &.flipped,
      &.matched {
        .back {
          transform: rotateY(180deg);
        }

        .front {
          transform: rotateY(0deg);
        }
      }

      &.selected {
        .front {
          background-color: var(--clr-primary);
        }
      }
    }
  }

  .cards-list-small {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 1em;

    .card-item {
      min-height: 4.5rem;
      padding: 2em;

      .front,
      .back {
        width: 4.5rem;
        height: 4.5rem;
        padding-top: 0.75em;
      }

      .front {
        .icon {
          font-size: 2.75rem;
        }

        span {
          font-size: 3em;
        }
      }

      @media only screen and (min-width: 768px) {
        min-height: 6.5rem;
        padding: 3em;

        .front,
        .back {
          width: 6.5rem;
          height: 6.5rem;
          padding-top: 0.85em;
        }

        .front {
          .icon {
            font-size: 4rem;
          }

          span {
            font-size: 5em;
          }
        }
      }
    }
  }

  .cards-list-large {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    gap: 0em;

    .card-item {
      min-height: 3.2rem;
      padding: 1.75em;

      .front,
      .back {
        width: 3.2rem;
        height: 3.2rem;
        padding-top: 0.75em;
      }

      .front {
        .icon {
          font-size: 1.9rem;
        }

        span {
          font-size: 1.4em;
        }
      }

      @media only screen and (min-width: 768px) {
        min-height: 4.5rem;
        padding: 2.5em;

        .front,
        .back {
          width: 4.5rem;
          height: 4.5rem;
        }

        .front {
          .icon {
            font-size: 2.7rem;
          }

          span {
            font-size: 3em;
          }
        }
      }
    }
  }
}
</style>
