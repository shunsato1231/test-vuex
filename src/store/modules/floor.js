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
    floors: [],
  },
  getters: {
    // 編集中のフロアIDを返す
    editId: state => state.editId,
		// 編集中のユーザの名前を返す
		editUser: state => state.editUser,
    // 編集中のフロアの要素を返す
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
    // フロアリストのIDからフロアを返す
    findFloorById: state => id => find(state.floors, o => o.id === id)
  },
  mutations: {
    // 編集中のIDをセット
    setEditId(state, { id }) {
      state.editId = id
    },
		setEditUser(state, { user }) {
      state.editUser = user
    },
    // フロアリストをセット
    setList(state, { floors }) {
      state.floors = floors
    },
    // フロアを追加
    add(state, { newdata }) {
      state.floors.push(newdata)
    },
    // フロアを更新
    update(state, { floor, newdata, user }) {
      floor.name = newdata.name,
			floor.editor = '',
      floor.last_editor = user,
    },
    // フロアを削除
    delete(state, { id }) {
      state.floors = state.floors.filter(el => el.id !== id)
    }
  },
  actions: {
    // 全フロアを読み込む
    load({ commit }) {
      return database.getFloors().then(floors => {
        commit('setList', { floors })
      }).catch(error => {
        commit('toast/add', error, { root: true })
      })
    },
    // 編集を開始
    edit({ commit, getters }, { id, user }) {
			const editFloor = getters.findFloorById(id)
			if(editFloor.editor === ''){
      	commit('setEditId', { id })
				commit('setEditUser', { user })
			}else{
				const error = editFloor.eidtor + 'さんが編集中のため編集できません'
				commit('toast/add', error, {root: true})
			}
    },
		// フロアを追加
		add({ commit }, newdata){
			return api.postFloor(newdata.id, newdata).then(newdata => {
				commit('add', { newdata })
			}).catch(error => {
				commit('toast/add', error, { root: true })
			})
		}
    //フロアを保存
    save({ commit, getters }, newdata) {
        return api.putFloor(newdata.id, newdata).then(newdata => {
          const floor = getters.findFloorById(newdata.id)
          commit('update', { floor, newdata, getters.editUser })
        }).catch(error => {
          commit('toast/add', error, { root: true })
        })
      }
    },
    // フロアを削除
    delete({ commit, dispatch }, id) {
      api.deleteFloor(id).then(entry => {
        commit('delete', { id })
      })
    }
  }
}
