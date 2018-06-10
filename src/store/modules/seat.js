import _ from 'lodash'

export default {
  // ネームスペースを利用する
  namespaced: true,

  state: {
    seats: []
  },

  getters: {
    orderedSeats: state => _.orderBy(state.seats, 'id', 'asc')
  },

  mutations: {
    // フロアリストをセット
    setList (state, { seats }) {
      state.seats = seats
    }
  },

  actions: {
    // 座席を読み込む
    fetch ({ commit }) {
      const seats = [
        { id: 1, floor_id: 1, name: 'Aさん', width: 2, height: 3, pos_x: 3, pos_y: 4, color: '#FFFFFF' },
        { id: 2, floor_id: 1, name: 'Bさん', width: 2, height: 3, pos_x: 3, pos_y: 4, color: '#FFFFFF' },
        { id: 3, floor_id: 1, name: 'Cさん', width: 2, height: 3, pos_x: 3, pos_y: 4, color: '#FFFFFF' },
        { id: 4, floor_id: 2, name: 'Aさん', width: 2, height: 3, pos_x: 3, pos_y: 4, color: '#FFFFFF' },
        { id: 5, floor_id: 2, name: 'Bさん', width: 2, height: 3, pos_x: 3, pos_y: 4, color: '#FFFFFF' },
        { id: 6, floor_id: 2, name: 'Cさん', width: 2, height: 3, pos_x: 3, pos_y: 4, color: '#FFFFFF' },
        { id: 7, floor_id: 3, name: 'Aさん', width: 2, height: 3, pos_x: 3, pos_y: 4, color: '#FFFFFF' },
        { id: 8, floor_id: 3, name: 'Bさん', width: 2, height: 3, pos_x: 3, pos_y: 4, color: '#FFFFFF' },
        { id: 9, floor_id: 3, name: 'Cさん', width: 2, height: 3, pos_x: 3, pos_y: 4, color: '#FFFFFF' }
      ]

      commit('setList', { seats })
    }
  }
}
