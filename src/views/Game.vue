<template>
  <div id="game" class="">
    <div class="header container">
      <h1>memory</h1>
      <button class="btn btn-primary btn-menu" @click.prevent="openMenu">Menu</button>
      <MobileMenu v-if="showMenu" @close="showMenu = false" />
      <div class="btn-group">
        <button class="btn btn-primary btn-restart" @click.prevent="restartGame">
          Restart
        </button>
        <button class="btn btn-secondary btn-new-game" @click.prevent="newGame">
          New Game
        </button>
      </div>
    </div>
    <div class="game">
      <GameBoard />
    </div>
    <div class="footer container">
      <FooterSolo />
    </div>
    <!-- <FooterMulti /> -->
  </div>
</template>

<script>
import GameBoard from "../components/game/GameBoard.vue";
// import FooterMulti from "../components/game/footers/FooterMulti.vue";
import FooterSolo from "../components/game/footers/FooterSolo.vue";
import MobileMenu from "../components/game/modals/MobileMenu.vue";

export default {
  name: "Game",
  components: {
    GameBoard,
    // FooterMulti,
    FooterSolo,
    MobileMenu,
  },
  data() {
    return {
      showMenu: false,
    };
  },
  created() {
    this.$store.dispatch("startTimer");
  },
  computed: {},
  methods: {
    openMenu() {
      this.showMenu = !this.showMenu;
    },
    restartGame() {
      this.$store.dispatch("stopTimer");
      this.$store.dispatch("resetTimer");
      this.$store.dispatch("restartGame").then(() => {
        this.$store.dispatch("startTimer");
      });
    },
    newGame() {
      this.$store.dispatch("stopTimer");
      this.$store.dispatch("setCards");
      this.$store.dispatch("shuffleCards");
      this.$store.dispatch("setRemainingPairs", this.$store.getters["getCardPairs"]);
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
#game {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 1em;
  padding-bottom: 1em;

  @media only screen and (min-width: 768px) {
    padding-top: 2em;
    padding-bottom: 2em;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    //flex: 0 0 3rem;

    .btn {
      padding: 0.5em 1.25em;
    }

    .btn + .btn {
      margin-left: 1em;
    }
  }

  .game {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-block: 0.25rem;
  }

  .footer {
    flex: 0 0 2rem;
    margin-top: auto;
  }
}

.btn-group {
  visibility: hidden;
  display: none;
}

.btn-restart,
.btn-new-game {
  
  font-size: 1.25em;
}

@media only screen and (min-width: 768px) {
  .header h1 {
    font-size: 2.5em;
  }

  .btn-menu {
    visibility: hidden;
    display: none;
  }
  .btn-group {
    visibility: visible;
    display: block;
  }
}
</style>
