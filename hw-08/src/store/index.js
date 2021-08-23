import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    paymentsList: [],
    headers: [],
    categoriesList: []
  },
  mutations: {
    deleteEntryPaymentList(state, payload) {
      state.paymentsList.splice((payload), 1)
    },
    saveEditedEntryPaymentList(state, payload) {
      // надо использовать indexOf
      this.state.paymentsList[payload.itemId].category = payload.category;
      this.state.paymentsList[payload.itemId].date = payload.date;
      this.state.paymentsList[payload.itemId].value = payload.value;
    },
    setPaymentListData(state, payload) {
      state.paymentsList = payload;
    },
    setHeadersData(state, payload) {
      state.headers = payload;
    },
    setCategoriesListData(state, payload) {
      state.categoriesList = payload;
    },
    addDataToPaymentsList(state, payload) {
      // дебагнуть
      console.log(payload);
      state.paymentsList.push(payload);
    }
  },
  actions: {
    // Getting payment list from server
    fetchData({commit}) {
      fetch('https://raw.githubusercontent.com/mrmeihem/vue-js/WIP/spendings_3.json')
          .then(result => result.json())
          .then(data => {
            commit('setPaymentListData', data);
          })
          .catch(error => console.log(error))
    },
    fetchHeaders({commit}) {
      fetch('https://raw.githubusercontent.com/mrmeihem/vue-js/WIP/headers.json')
          .then(result => result.json())
          .then(data => {
            commit('setHeadersData', data);
          })
          .catch(error => console.log(error))
    },
    fetchCategories({commit}) {
      fetch('https://raw.githubusercontent.com/mrmeihem/vue-js/main/categories-2.json')
          .then(result => result.json())
          .then(data => {
            commit('setCategoriesListData', data);
          })
          .catch(error => console.log(error))
    }
  },
  getters: {
    getPaymentList: state => state.paymentsList,
    getCategoryList: state => state.categoriesList,
    getPaymentListLength: state => state.paymentsList.length
  }
})
