import { createStore } from "vuex";
import icons from "../assets/icons";

export default createStore({
    state: {
        theme: "icons",
        numberOfPlayers: 1,
        gridSize: 4,
        time: 0,
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
        },
        setCards(state, payload) {},
        shuffleCards(state, payload) {},
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
    },
    actions: {
        newGame({ commit }, payload) {
            commit("newGame", payload);
        },
        setCards({ commit, state }) {
            if (state.theme === "icons") {
                for (let i = 0; i < state.gridSize * 2; i++) {
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
                for (let i = 0; i < state.gridSize * 2; ) {
                    let randomNumber = Math.floor(
                        Math.random() * (state.gridSize * 2)
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
            commit("setCards", state.cards);
        },
        shuffleCards({ commit, state }) {
            state.cards.sort(() => Math.random() - 0.1);

            state.cards.forEach((card, index) => {
                card.position = index;
            });
            commit("shuffleCards", state.cards);
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
    },
    getters: {
        getCardPairs: (state) => {
            return state.cards.length / 2;
        },
    },
    modules: {},
});
