import { createStore } from 'vuex'
import { router } from '@/router'

export const menu = createStore({
    state() {
        return {
            menu: [],
            curMenu: {},
            collapsed: false
        }
    },
    getters: {
        getMenu: () => (state) => {
            return state.menu
        },
        getCurMenu: () => (state) => {
            return state.curMenu
        },
        getCollapsed: () => (state) => {
            return state.collapsed
        },
    },
    mutations: {
        setMenu(state, Menu) {
            state.menu = Menu
        },
        setCurMenu(state, CurMenu) {
            state.curMenu = CurMenu
        },
        setCollapsed (state, collapsed) {
            state.collapsed = collapsed
        },
    },
    actions: {
        setMenu(context, Menu) {
            context.commit('setMenu', Menu)
        },
        setCurMenu(context, CurMenu) {

            context.commit('setCurMenu', CurMenu)

            router.push({ path: CurMenu.key })
        },
        setCollapsed(context, collapsed) {
            context.commit('setCollapsed', collapsed)
        },

    }
})