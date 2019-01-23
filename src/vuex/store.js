import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// 注册vuex
Vue.use(Vuex)
// 状态
const state = {
	userinfo: JSON.parse(localStorage.getItem('userinfo')),
	userlist: []
}

// 通过操作mutations改变state的值
const mutations = {
	SAVE_USERINFO(state,userinfo){
		// 将用户数据存入本地存储中
		localStorage.setItem('userinfo',JSON.stringify(userinfo))
		state.userinfo = userinfo
	},
	GET_USERLIST(state,userlist){
		state.userlist = userlist
	}
}
// 通过操作actions来commit montaions改变状态
const actions = {
	GET_USERLIST({ commit }){
		return new Promise((resolve,reject)=>{
			axios.get('/api/getusers').then(res=>{
				commit('GET_USERLIST',res.data)
				resolve()
			})
		})
	}
}
// 创建store仓库将state暴露出去
export default new Vuex.Store({
	state,
	mutations,
	actions
})