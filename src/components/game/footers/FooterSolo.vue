<template>
  <div id="footer">
    <div class="time-left">
      <h3>Time</h3>
      <p class="number">1:53</p>
    </div>
    <div class="moves">
      <h3>Moves</h3>
      <p class="number">39</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "FooterSolo",
};
</script>

<style lang="scss" scoped>
#footer {
  display: flex;
  flex-direction: row;
  gap: 1em;
  text-align: center;

  .time-left,
  .moves {
    flex: 1;
    background-color: var(--clr-secondary);
    border-radius: 0.3125rem;
    padding: 1em 0;

    h3 {
      margin-bottom: 0.5em;
    }

    p {
      font-size: 1.5em;
    }
  }
}
</style>
