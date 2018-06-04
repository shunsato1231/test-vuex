// デモ用 mockAPI
// http://chibinowa.net/note/vuejs/vue-14.html
// import axios from 'axios'
import find from 'lodash/find'
import findIndex from 'lodash/findIndex'
import maxBy from 'lodash/maxBy'
import cloneDeep from 'lodash/cloneDeep'

// サーバー処理の代わり
const FloorDatabase = {
  autoincrement: 3,
  floor: [
    { id: 1, name: 'フロア1', editor: '', last_editor: 'Aさん' },
    { id: 2, name: 'フロア2', editor: '', last_editor: 'Bさん' },
    { id: 3, name: 'フロア3', editor: '', last-editor: 'Cさん' }
  ],
  fetch() {
    return { status: true, entry: this.floor }
  },
  find(id) {
    return { status: true, entry: find(this.floor, o => o.id === id) }
  },
  push(floor) {
    const newdata = Object.assign({}, floor, {
      id: ++this.autoincrement,
      name: floor.name === '' ? 'noname' : floor.name,
			editor: floor.editor,
      last_editor: floor.last_editor === '' ? 'noname' : floor.last_editor,
    })
    this.floor.push(newdata)
    return { status: true, entry: newdata }
  },
  update(floor) {
    const index = findIndex(this.floor, el => el.id === floor.id)
    this.floor[index] = floor
    return { status: true, entry: floor }
  },
  delete(id) {
    this.floor = this.floor.filter(el => el.id !== id)
    return { status: true }
  }
}


const SeatsDatabase = {
  autoincrement: 9,
  seats: [
    { id: 1, floor_id: 1, name: 'Aさん', width: 2, height: 3, pos_x: 3, pos_y: 4, color:'#FFFFFF'},
    { id: 2, floor_id: 1, name: 'Bさん', width: 2, height: 3, pos_x: 3, pos_y: 4, color:'#FFFFFF'},
    { id: 3, floor_id: 1, name: 'Cさん', width: 2, height: 3, pos_x: 3, pos_y: 4, color:'#FFFFFF'},
		{ id: 4, floor_id: 2, name: 'Aさん', width: 2, height: 3, pos_x: 3, pos_y: 4, color:'#FFFFFF'},
    { id: 5, floor_id: 2, name: 'Bさん', width: 2, height: 3, pos_x: 3, pos_y: 4, color:'#FFFFFF'},
    { id: 6, floor_id: 2, name: 'Cさん', width: 2, height: 3, pos_x: 3, pos_y: 4, color:'#FFFFFF'},
		{ id: 7, floor_id: 3, name: 'Aさん', width: 2, height: 3, pos_x: 3, pos_y: 4, color:'#FFFFFF'},
    { id: 8, floor_id: 3, name: 'Bさん', width: 2, height: 3, pos_x: 3, pos_y: 4, color:'#FFFFFF'},
    { id: 9, floor_id: 3, name: 'Cさん', width: 2, height: 3, pos_x: 3, pos_y: 4, color:'#FFFFFF'}
  ],
  fetch(id) {
    return { status: true, entry: find(this.seats, o => o.floor_id === id) }
  },
  post(newdata) {
		this.seats = this.seats.filter(el => el.floor_id !== floor_id)
		newdata.forEach((el)=>{
			const addData = Object.assign({}, seats, {
				id: ++el.autoincrement,
				floor_id: el.floor_id,
				name: el.name,
				width: el.width,
				height: el.height,
				pos_x: el.pos_x,
				pos_y: el.pos_y,
				color: el.color,
			})
			this.seats.push(addData)
		})
    return { status: true, entry: this.seats }
  }
}

// axiosの代わり
const floor = {
  get: (path) => new Promise((resolve, reject) => {
    resolve({ data: cloneDeep(FloorDatabase.fetch()) })
  }),
  put: (path, arg) => new Promise(resolve => {
    resolve({ data: cloneDeep(FloorDatabase.update(arg.item)) })
  }),
  post: (path, arg) => new Promise(resolve => {
    resolve({ data: cloneDeep(FloorDatabase.push(arg.item)) })
  }),
  delete: (path, arg) => new Promise(resolve => {
    resolve({ data: cloneDeep(FloorDatabase.delete(arg.id)) })
  })
}

const seats = {
  get: (path) => new Promise((resolve, reject) => {
    resolve({ data: cloneDeep(SeatsDatabase.fetch()) })
  }),
  post: (path, arg) => new Promise(resolve => {
    resolve({ data: cloneDeep(SeatsDatabase.post(arg.item)) })
  })
}

// 成功処理
const apiSuccess = response => {
  if (response.data.status === true) {
    return Promise.resolve(response.data.entry)
  } else {
    return Promise.reject(response.data.message)
  }
}
// 失敗処理
const apiError = error => {
  if (typeof error === 'string') {
    return Promise.reject(error)
  } else {
    return Promise.reject('APIに接続できません')
  }
}

export const database = {
  getFloors: () =>
    floor.get('/vue-test/api/member/list').then(apiSuccess).catch(apiError),
  postFloor: (id, item) =>
    floor.post('/vue-test/api/member', { item }).then(apiSuccess).catch(apiError),
  putFloor: (id, item) =>
    floor.put(`/vue-test/api/member/${id}`, { item }).then(apiSuccess).catch(apiError),
  deleteFloor: (id) =>
    floor.delete(`/vue-test/api/member/${id}`, { id }).then(apiSuccess).catch(apiError),
	getSeats: () =>
	  seat.get('/vue-test/api/member/list').then(apiSuccess).catch(apiError),
	postSeats: (id, item) =>
	  seat.post('/vue-test/api/member', { item }).then(apiSuccess).catch(apiError),
}
