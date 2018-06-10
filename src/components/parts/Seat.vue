<template lang="pug">
  .seat
    span {{seat.name}} {{index}}
</template>

<script>
export default {
  name: 'Seat',
  props: ['seat', 'gridSize', 'index']
}
</script>

<style scoped>
.grid {
  border-top: solid 1px #eee;
  border-left: solid 1px #eee;
  background-image:
    linear-gradient(
      transparent 95%,
      #eee 1%
    ),
    linear-gradient(
      90deg,
      transparent 95%,
      #eee 1%
    );
  background-size: calc(100% / 85) calc(100% / 40);
  background-repeat: repeat;
}
</style>
