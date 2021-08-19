import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    paymentsList: {},
    headers: {},
    categoriesList: [],
    PageNumber: 1
  },
  mutations: {
    deleteEntryPaymentList(state, payload) {
      payload.id += ' deleted';
    },
    saveEditedEntryPaymentList(state, payload) {
      this.state.paymentsList['page'+this.state.PageNumber][payload.id-1].category = payload.category;
      this.state.paymentsList['page'+this.state.PageNumber][payload.id-1].date = payload.date;
      this.state.paymentsList['page'+this.state.PageNumber][payload.id-1].value = payload.value;
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
      // добавить логику добавления записи на последнюю страницу
      console.log(this.getPaymentList());
      // console.log(this.getPaymentList['page'+(this.getPaymentList.length+1)]);
      state.paymentsList.push(payload);
    },
    setNewPageNumber(state, payload) {
      state.PageNumber = payload;
    }
  },
  actions: {
    // Getting payment list from server
    fetchData({commit}) {
      fetch('https://raw.githubusercontent.com/mrmeihem/vue-js/main/spendings_3.json')
          .then(result => result.json())
          .then(data => {
            commit('setPaymentListData', data);
          })
          .catch(error => console.log(error))
    },
    fetchHeaders({commit}) {
      fetch('https://raw.githubusercontent.com/mrmeihem/vue-js/main/headers.json')
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
    getPageNumber: state => state.PageNumber
  }
})
