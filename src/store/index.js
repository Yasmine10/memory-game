import { createStore } from "vuex";
import icons from "../assets/icons";

export default createStore({
  state: {
    theme: "numbers",
    numberOfPlayers: 1,
    gridSize: 16,
    time: 0,
    timeInterval: null,
    moves: 0,
    players: [],
    cards: [],
    numberOfCardsFlipped: 0,
    cardsFlipped: [],
    remainingPairs: 0,
  },
  mutations: {
    newGame(state, payload) {
      state.theme = payload.theme;
      state.numberOfPlayers = Number(payload.numberOfPlayers);
      state.gridSize = payload.gridSize;
      state.moves = 0;
    },
    restartGame(state) {
      // only solo game
      state.moves = 0;
      state.numberOfCardsFlipped = 0;
      state.cardsFlipped = [];
      state.remainingPairs = state.cards.length / 2;

      state.cards.forEach((item) => {
        item.flipped = false;
        item.matched = false;
      });
    },
    setCardFlipped(state, payload) {
      let card = state.cards.find(
        (item) => item.position === payload.position
      );
      card.flipped = payload.flipped;
    },
    setNumberOfCardsFlipped(state, payload) {
      state.numberOfCardsFlipped = Number(payload);
    },
    setCardsFlipped(state, payload) {
      state.cardsFlipped.push({
        id: payload.id,
        position: payload.position,
      });
    },
    resetCardsFlipped(state) {
      state.cardsFlipped.length = 0;
    },
    setCardsMatched(state, payload) {
      let firstCard = state.cards.find(
        (item) => item.position === payload.card1.position
      );
      let secondCard = state.cards.find(
        (item) => item.position === payload.card2.position
      );
      firstCard.matched = true;
      secondCard.matched = true;
    },
    setRemainingPairs(state, payload) {
      state.remainingPairs = Number(payload);
      console.log(state.remainingPairs);
    },
    setMoves(state, payload) {
      state.moves += Number(payload);
    },
    resetMoves(state) {
      state.moves = 0;
    },
    updateTime(state, payload) {
      state.time = Number(payload);
    },
    setTime(state) {
      state.time += 1;
    },
    stopTimer(state) {
      clearInterval(state.timeInterval);
      state.timeInterval = null;
    },
    resetTimer(state) {
      state.time = 0;
    },
  },
  actions: {
    newGame({ commit }, payload) {
      commit("newGame", payload);
    },
    restartGame({ commit }) {
      commit("restartGame");
    },
    setCards({ state }) {
      //empty cards array
      state.cards.length = 0;

      // fill cards array with icons or numbers
      if (state.theme === "icons") {
        for (let i = 0; i < state.gridSize / 2; i++) {
          state.cards.push({
            id: i,
            value: icons[i],
            flipped: false,
            matched: false,
            position: null,
          });
          state.cards.push({
            id: i,
            value: icons[i],
            flipped: false,
            matched: false,
            position: null,
          });
        }
      } else {
        for (let i = 0; i < state.gridSize / 2;) {
          let randomNumber = Math.floor(
            Math.random() * (state.gridSize / 2)
          );
          if (
            !(
              state.cards.filter(
                (item) => item.value === randomNumber
              ).length > 0
            )
          ) {
            state.cards.push({
              id: i,
              value: randomNumber,
              flipped: false,
              matched: false,
              position: null,
            });
            state.cards.push({
              id: i,
              value: randomNumber,
              flipped: false,
              matched: false,
              position: null,
            });
            i++;
          }
        }
      }
    },
    shuffleCards({ state }) {
      state.cards.sort(() => Math.random() - 0.5);
      state.cards.sort(() => Math.random() - 0.5);

      state.cards.forEach((card, index) => {
        card.position = index;
      });
    },
    setCardFlipped({ commit }, payload) {
      commit("setCardFlipped", payload);
    },
    setNumberOfCardsFlipped({ commit }, payload) {
      commit("setNumberOfCardsFlipped", payload);
    },
    setCardsFlipped({ commit }, payload) {
      commit("setCardsFlipped", payload);
    },
    resetCardsFlipped({ commit }) {
      commit("resetCardsFlipped");
    },
    setCardsMatched({ commit }, payload) {
      commit("setCardsMatched", payload);
    },
    setRemainingPairs({ commit }, payload) {
      commit("setRemainingPairs", payload);
    },
    setMoves({ commit }, payload) {
      commit("setMoves", payload);
    },
    resetMoves({ commit }) {
      commit("resetMoves");
    },
    updateTime({ commit }, payload) {
      commit("updateTime", payload);
    },
    startTimer({ state, commit }) {
      state.timeInterval = setInterval(() => {
        commit("setTime");
      }, 1000);
    },
    stopTimer({ commit }) {
      commit("stopTimer");
    },
    resetTimer({commit}) {
      commit("resetTimer");
    },
  },
  getters: {
    getCardPairs: (state) => {
      return state.cards.length / 2;
    },
  },
  modules: {},
});
