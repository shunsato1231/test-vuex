<template lang='pug'>
  .View {{gridSize}}
    button(@click = 'zoomIn') +
    button(@click = 'zoomOut') -
    button(@click = 'fit') fit
    .grid(:style="{width: (gridSize * 85) + 'px', height: (gridSize * 40) + 'px', top: 100 + 'px'}")
      Seat(v-for="(seat, id) in orderedSeats",
        :key = "seat.id",
        :index = "id",
        :seat="seat",
        :grid-size = "gridSize")
</template>

<script>
import _ from 'lodash'
import Seat from './parts/Seat.vue'

export default {
  name: 'HelloWorld',
  components: { Seat },

  data () {
    return {
      floors: [
        { id: 1, name: 'フロア1', editor: '', last_editor: 'Aさん' },
        { id: 2, name: 'フロア2', editor: '', last_editor: 'Bさん' },
        { id: 3, name: 'フロア3', editor: '', last_editor: 'Cさん' }
      ],
      gridSize: window.innerWidth / 85
    }
  },
  created () {
    window.addEventListener('resize', this.setWindowWidth, false)
    this.$store.dispatch('seat/fetch')
  },

  computed: {
    orderedSeats () {
      return this.$store.getters['seat/orderedSeats']
    }
  },

  methods: {
    setWindowWidth: _.debounce(function () {
      this.gridSize = window.innerWidth / 85
    }, 300),

    zoomIn () {
      window.removeEventListener('resize', this.setWindowWidth, false)
      this.gridSize = this.gridSize + 1
    },

    zoomOut () {
      window.removeEventListener('resize', this.setWindowWidth, false)
      this.gridSize = this.gridSize - 1
    },

    fit () {
      window.addEventListener('resize', this.setWindowWidth, false)
      this.gridSize = window.innerWidth / 85
    }
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.setWindowWidth, false)
  }
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
