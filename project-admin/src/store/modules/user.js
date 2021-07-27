import { createStore } from 'vuex'
import { loginApi } from '@/api'
import { router } from '@/router'
export const user = createStore({
    state () {
      return {
        userInfo: {},
        token: null,
        roleList: [],
        sessionTimeout: false,
      }
    },
    getters: {
        getUserInfo: ()=> (state) =>{
            return state.userInfo
        },
        getToken: ()=> (state) =>{
            return state.token
        },

        getRoleList: ()=> (state) =>{
            return state.roleList
        },
        getSessionTimeout: ()=> (state) =>{
            return state.sessionTimeout
        },
    },
    mutations: {
        setUserInfo (state,UserInfo) {
            state.UserInfo = UserInfo
        },
        setToken (state,token) {
            state.token = token
        },
        setRoleList (state,roleList) {
            state.roleList = roleList
        },
        setSessionTimeout (state,sessionTimeout) {
            state.sessionTimeout = sessionTimeout
        },
    },
    actions: {
        setUserInfo (context,UserInfo) {
            context.commit('setUserInfo',UserInfo)
        },
        setToken (context,token) {
            context.commit('setToken',token)
        },
        setRoleList (context,roleList) {
            context.commit('setRoleList',roleList)
        },
        setSessionTimeout (context,sessionTimeout) {
            context.commit('setSessionTimeout',sessionTimeout)
        },
        resetState() {
            this.userInfo = null;
            this.token = '';
            this.roleList = [];
            this.sessionTimeout = false;
        },
        login() {
            loginApi();
            router.replace({path:"/welcome"})
        },
    }
  })