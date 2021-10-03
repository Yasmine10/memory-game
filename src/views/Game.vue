<template>
  <div id="game" class="container">
    <div class="header">
      <h1>memory</h1>
      <button class="btn btn-primary" @click.prevent="openMenu">Menu</button>
      <MobileMenu v-if="showMenu" @close="showMenu = false" />
    </div>
    <div class="game">
      <MemoryCards />
    </div>
    <div class="footer">
      <FooterSolo />
    </div>
    <!-- <FooterMulti /> -->
  </div>
</template>

<script>
import MemoryCards from "../components/game/GameBoard.vue";
// import FooterMulti from "../components/game/footers/FooterMulti.vue";
import FooterSolo from "../components/game/footers/FooterSolo.vue";
import MobileMenu from "../components/game/modals/MobileMenu.vue";

export default {
  name: "Game",
  components: {
    MemoryCards,
    // FooterMulti,
    FooterSolo,
    MobileMenu,
  },
  data() {
    return {
      showMenu: false,
    };
  },
  created() {},
  computed: {},
  methods: {
    openMenu() {
      this.showMenu = !this.showMenu;
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

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 0 0 3rem;

    .btn {
      padding: 0.5em 1.25em;
    }
  }

  .game {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .footer {
    flex: 0 0 2rem;
    margin-top: auto;
  }
}
</style>
