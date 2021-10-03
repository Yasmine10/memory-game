<template>
  <p>
    {{ formatTime() }}
  </p>
</template>

<script>
export default {
  name: "Timer",
  props: {
    // isTimeRunning: {
    //   required: true,
    //   type: Boolean,
    // },
  },
  created() {
    this.time = this.$store.state.time;
    this.isRunning = this.isTimeRunning;
    this.toggleTimer();
  },
  data() {
    return {
      interval: null,
      time: 0,
      isRunning: false,
    };
  },
  computed: {
    // time() {
    //   return this.$store.state.time;
    // },
    isTimeRunning() {
      return this.$store.state.isTimeRunning;
    },
  },
  watch: {
    isTimeRunning(value) {
      console.log(value);
      if (value == true) {
        this.interval = setInterval(this.incrementTime, 1000);
      } else {
        this.isRunning = false;
        clearInterval(this.interval);
        this.$store.dispatch("setIsTimeRunning", value);
      }
    },
  },
  methods: {
    formatTime() {
      const time = this.time;

      const minutes = Math.floor(time / 60);
      let seconds = time % 60;
      if (seconds < 10) {
        seconds = `0${seconds}`;
      }

      return `${minutes}:${seconds}`;
    },
    toggleTimer() {
      if (this.isRunning === false) {
        this.$store.dispatch("setIsTimeRunning", false);
        clearInterval(this.interval);
        // timer stops
      } else {
        this.interval = setInterval(this.incrementTime, 1000);
      }
      this.isRunning = !this.isRunning;
    },
    incrementTime() {
      this.time = parseInt(this.time) + 1;
      this.$store.dispatch("updateTime", this.time);
    },
  },
};
</script>

<style lang="scss" scoped></style>
