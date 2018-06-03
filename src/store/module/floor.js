// 先に作ったAPIモジュールを使う
import api from '@/api/database'
// Lodash
import orderBy from 'lodash/orderBy'
import find from 'lodash/find'
export default {
  // ネームスペースを利用する
  namespaced: true,
  state: {
    editId: null, // 編集中のフロアID
		editUser: null, // 編集中のユーザ名
    floors: []
  },
  getters: {
    // 編集中のIDを返す
    editId: state => state.editId,
    // 編集中の要素を返す
    editTemplate: state => {
      if (state.editId !== -1) {
        return find(state.floors, o => o.id === state.editId)
      } else {
        return {
          id: -1,
          name: 'noname',
					last-edit: '',
        }
      }
    },
    // フロアリストを引数の項目でソートして返す
    orderList: state => field => orderBy(state.floors, field, 'asc'),
    // フロアリストのIDからフロア内容を返す
    findFloorById: state => id => find(state.floors, o => o.id === id)
  },
  mutations: {
    // 編集中のIDをセット
    setEditId(state, { id }) {
      state.editId = id
    },
    // フロアリストをセット
    setList(state, { floors }) {
      state.floors = floor
    },
    // フロアを追加
    add(state, { newdata }) {
      state.floors.push(newdata)
    },
    // フロアを更新
    update(state, { floor, newdata }) {
      floor.name = newdata.name
      floor.last-edit = state.editUser
    },
    // フロアを削除
    delete(state, { id }) {
      state.floors = state.floors.filter(el => el.id !== id)
    }
  },
  actions: {
    // 全メンバーを読み込む
    load({ commit }) {
      return database.getFloors().then(floors => {
        commit('setList', { floors })
      }).catch(error => {
        commit('toast/add', error, { root: true })
      })
    },
    // 編集を開始
    doEdit({ commit, getters }, id) {
      commit('setEditId', { id })
    },
    //フロアを保存
    doSave({ commit, getters }, newdata) {
      // IDが-1なら追加
      if (newdata.id === -1) {
        return api.postFloor(newdata.id, newdata).then(newdata => {
          commit('add', { newdata })
        }).catch(error => {
          commit('toast/add', error, { root: true })
        })
      } else {
        return api.putFloor(newdata.id, newdata).then(newdata => {
          const floor = getters.findFloorById(newdata.id)
          commit('update', { floor, newdata })
        }).catch(error => {
          commit('toast/add', error, { root: true })
        })
      }
    },
    // フロアを削除
    doDelete({ commit, dispatch }, id) {
      api.deleteFloor(id).then(entry => {
        commit('delete', { id })
      })
    }
  }
}
