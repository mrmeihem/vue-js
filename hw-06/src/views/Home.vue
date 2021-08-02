<template>
  <div id="app">
    <AddPayment :categories="categories" @addNewPayment="addData"/>
    <PaymentsDisplay :list="this.getPaymentList(this.$store.state.PageNumber)"/>
    <MenuWindow/>
    <transition name="fade">
      <modal-window v-if="modalSettings.name" :settings="modalSettings"/>
    </transition>
    <Pagination :PageNumber="PageNumber" @newPageNumber="newPageNumber"/>
  </div>
</template>

<script>
import PaymentsDisplay from '../components/PaymentsDisplay.vue'
import AddPayment from '../components/AddPayment.vue'
import Pagination from '../components/Pagination.vue'
import { mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    PaymentsDisplay,
    AddPayment,
    Pagination,
    ModalWindow: ()=> import(/* webpackChunkName: 'ModalWindow' */ '../components/ModalWindow.vue'),
    MenuWindow: ()=> import(/* webpackChunkName: 'MenuWindow' */ '../components/MenuWindow.vue')
  },
  data(){
    return {
      modalShown: false,
      modalSettings: {}
    }
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
    onShown(settings) {
      this.modalSettings = settings
    },
    showPaymentsForm (){
      this.$modal.show('EditPayment',{header:"Edit Payment"})
    },
    closePaymentsForm (){
      this.$modal.hide()
    },
    onHide(){
      this.modalSettings = {}
    },
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
  },
  mounted(){
    this.$modal.EventBus.$on('shown', this.onShown);
    this.$modal.EventBus.$on('hide', this.onHide);
  },
  beforeDestroy(){
    this.$modal.EventBus.$off('shown', this.onShown);
    this.$modal.EventBus.$off('shown', this.onShown);
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
  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
