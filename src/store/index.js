import Vue from 'vue';
import Vuex from 'vuex';
import util from '@/api/publicMethods/utils';
import defaultSettings from '@/settings';
const { showSettings, fixedHeader, sidebarLogo } = defaultSettings;

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        sidebar: {
            opened: util.getLocalStorageData("token") ? !!+util.getLocalStorageData("token") : true,
            withoutAnimation: false
        },
        device: 'desktop',
        showSettings: showSettings,
        fixedHeader: fixedHeader,
        sidebarLogo: sidebarLogo,
        token: util.getLocalStorageData("token"),
        name: '',
        avatar: ''
    },
    actions: {
        toggleSideBar({ commit }) {
            commit('TOGGLE_SIDEBAR')
        },
        closeSideBar({ commit }, { withoutAnimation }) {
            commit('CLOSE_SIDEBAR', withoutAnimation)
        },
        toggleDevice({ commit }, device) {
            commit('TOGGLE_DEVICE', device)
        }
    },
    mutations: {
        TOGGLE_SIDEBAR: state => {
            state.sidebar.opened = !state.sidebar.opened
            state.sidebar.withoutAnimation = false
        },
        CLOSE_SIDEBAR: (state, withoutAnimation) => {
            state.sidebar.opened = false
            state.sidebar.withoutAnimation = withoutAnimation
        },
        TOGGLE_DEVICE: (state, device) => {
            state.device = device
        }
    }
})
export default store;