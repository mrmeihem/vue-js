import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    paymentsList: [],
    headers: [],
    categoriesList: [],
    chartData: {
      hoverBackgroundColor: "red",
      hoverBorderWidth: 10,
      labels: [""],
      datasets: [
        {
          label: "Data One",
          backgroundColor: [
            "#67B6EB",
            "#EB214A",
            "#5CEBCE",
            "#EB9821",
            "#5CEBCE",
          ],
          data: [""],
        },
      ],
    }
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
    setChartData(state, payload) {
      state.chartData.datasets[0].data = payload;
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
            commit('setChartCategoriesData', data);
          })
          .catch(error => console.log(error))
    }
  },
  getters: {
    getPaymentList: state => state.paymentsList,
    getCategoryList: state => state.categoriesList,
    getPaymentListLength: state => state.paymentsList.length,
    getCategoryListLength: state => state.categoriesList.length
  }
})
