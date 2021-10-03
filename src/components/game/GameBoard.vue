<template>
  <div id="memorycards">
    <div
      class="cards-list"
      :class="{
        'cards-list-small': gridSize == 16,
        'cards-list-large': gridSize == 36,
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
          <font-awesome-icon
            class="icon"
            :icon="['fas', card.value]"
            :class="{
              'fa-3x': gridSize == 16,
              'fa-lg': gridSize == 36,
            }"
          />
        </div>
        <div class="front" v-else>
          <span>{{ card.value }}</span>
        </div>
        <div class="back"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GameBoard",
  data() {
    return {
      cards: [],
      cardsFlipped: [],
      numberOfCardsFlipped: 0,
      moves: 0,
      remainingPairs: 0,
    };
  },
  created() {
    this.$store.dispatch("setCards");
    this.$store.dispatch("shuffleCards");

    this.cards = this.$store.state.cards;
    this.numberOfCardsFlipped = this.$store.state.numberOfCardsFlipped;
    this.cardsFlipped = this.$store.state.cardsFlipped;
    this.$store.dispatch("setRemainingPairs", this.cardPairs);
    this.remainingPairs = this.$store.state.remainingPairs;
    this.moves = this.$store.state.moves;
    console.log(this.$store.state.remainingPairs);
  },
  computed: {
    theme() {
      return this.$store.state.theme;
    },
    gridSize() {
      return this.$store.state.gridSize;
    },
    cardPairs() {
      return this.$store.getters["getCardPairs"];
    },
  },
  methods: {
    flipCard(card) {
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
        alert("You won");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#memorycards {
  .cards-list {
    display: grid;
    gap: 1em;

    .card-item {
      width: 100%;
      perspective: 1000;
      cursor: pointer;

      .front,
      .back {
        backface-visibility: hidden;
        transition: 0.6s;
        transform-style: preserve-3d;

        position: absolute;
        content: "";

        border-radius: 50%;
        text-align: center;
        padding-top: 0.75em;
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

    .card-item {
      min-height: 4.5rem;

      .front,
      .back {
        width: 4.5rem;
        height: 4.5rem;
      }

      .front {
        .icon {
          size: 7rem;
        }

        span {
          font-size: 3em;
        }
      }
    }
  }

  .cards-list-large {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;

    .card-item {
      min-height: 2.9rem;

      .front,
      .back {
        width: 2.9rem;
        height: 2.9rem;
      }

      .front {
        .icon {
          size: 1.4rem;
        }

        span {
          font-size: 1.4em;
        }
      }
    }
  }
}
</style>
