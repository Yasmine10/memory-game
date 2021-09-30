import { createStore } from "vuex";

export default createStore({
    state: {
        theme: "numbers",
        numberOfPlayers: 1,
        gridSize: "4x4",
    },
    mutations: {
        startGame(state, payload) {
            state.theme = payload.theme;
            state.numberOfPlayers = Number(payload.numberOfPlayers);
            state.gridSize = payload.gridSize;
        },
    },
    actions: {
        startGame({ commit }, payload) {
            commit("startGame", payload);
        },
    },
    modules: {},
});
