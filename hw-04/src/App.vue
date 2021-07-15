<template>
  <div id="app">
<!--    <img alt="Vue logo" src="./assets/logo.png">-->
    <AddPayment @addNewPayment="addData"/>
    <PaymentsDisplay :list="this.getPaymentList(this.$store.state.currentPageNumber)"/>
  </div>
</template>

<script>
import PaymentsDisplay from './components/PaymentsDisplay.vue'
import AddPayment from './components/AddPayment.vue'
import { mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    PaymentsDisplay,
    AddPayment
  },
  methods: {
    ...mapMutations([
      'setPaymentListData',
      'addDataToPaymentsList'
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
  },
  computed: {
    ...mapGetters({
      paymentsList:'getPaymentList',
      categories: 'getCategoryList'
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
