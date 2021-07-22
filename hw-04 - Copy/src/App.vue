<template>
  <div id="app">
    <AddPayment :categories="categories" @addNewPayment="addData"/>
    <PaymentsDisplay :list="this.getPaymentList(this.$store.state.PageNumber)"/>
    <Pagination :PageNumber="PageNumber" @newPageNumber="newPageNumber"/>
  </div>
</template>

<script>
import PaymentsDisplay from './components/PaymentsDisplay.vue'
import AddPayment from './components/AddPayment.vue'
import Pagination from './components/Pagination.vue'
import { mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    PaymentsDisplay,
    AddPayment,
    Pagination
  },
  methods: {
    ...mapMutations([
      'setPaymentListData',
      'addDataToPaymentsList',
      'setNewPageNumber'
    ]),
    ...mapActions([
      'fetchData',
      'fetchCategory'
    ]),
    getPaymentList(pageNumber) {
      return this.$store.state.paymentsList['page'+pageNumber];
    },
    addData(data){
      console.log("push to state",data);
      // this.$store.state.addDataToPaymentsList(data);
      this.addDataToPaymentsList(data);
    },
    newPageNumber(direction){
      if (direction === 'previous') {
        const newPageN = (this.paymentsList['page' + (this.PageNumber - 1)]) ? (this.PageNumber - 1) : this.PageNumber;
        this.setNewPageNumber(newPageN);
      } else {
        const newPageN = (this.paymentsList['page' + (this.PageNumber + 1)]) ? (this.PageNumber + 1) : this.PageNumber;
        this.setNewPageNumber(newPageN);
      }
    }
  },
  computed: {
    ...mapGetters({
      paymentsList:'getPaymentList',
      categories: 'getCategoryList',
      PageNumber: 'getPageNumber'
    }),
  },
  created() {
    // at created getting categories and data lists
    this.$store.dispatch("fetchData");
    this.$store.dispatch("fetchCategories");
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
