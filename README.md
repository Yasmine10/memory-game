# Frontend Mentor - GitHub user search app solution

This is a solution to the [GitHub user search app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/github-user-search-app-Q09YOgaH6). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
    - [The challenge](#the-challenge)
    - [Screenshots](#screenshots)
    - [Links](#links)
- [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the game depending on their device's screen size
- See hover states for all interactive elements on the page
- Play the Memory game solo
<!-- - Play the Memory game either solo or multiplayer (up to 4 players) -->
- Set the theme to use numbers or icons within the tiles
- Choose to play on either a 6x6 or 4x4 grid

### Screenshots

![Solution screenshot game menu](https://github.com/Yasmine10/memory-game/blob/master/public/memory-game-solution-menu.png?raw=true)

![Solution screenshot game](https://github.com/Yasmine10/memory-game/blob/master/public/memory-game-solution-game.png?raw=true)

### Links

- Solution URL: [https://github.com/Yasmine10/memory-game](https://github.com/Yasmine10/memory-game)
- Live Site URL: [https://memory-game-yasmine.vercel.app/](https://memory-game-yasmine.vercel.app/)

## My process

### Built with

- [VueJS](https://vuejs.org/) - JS framework
- [Vuex](https://vuex.vuejs.org/) - State management pattern + library
- Semantic HTML5 markup
- Sass
- CSS custom properties
- Flexbox
- CSS Grid
- [Fontawesome icons](https://fontawesome.com/)
- Mobile-first workflow

### What I learned

- Creating a working timer that counts up was a challenge for me in this project. Mainly because I wanted to implement it in Vuex in order to be able to access it from within multiple components. I came up with a pretty simple solution in the end.

  ```js
  state: {
      time: 0,
      timeInterval: null,
  },
  mutations: {
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
  }
  ```

## Author

- Website - [yasminedewolf.be](https://yasminedewolf.be)
- Frontend Mentor - [@Yasmine10](https://www.frontendmentor.io/profile/Yasmine10)