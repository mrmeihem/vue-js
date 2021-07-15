<template>
  <div id="app" :class="[$style.wrapper]">
    <header>
      <h1>My personal cost</h1>
    </header>
    <main>
      <AddPayment @addNewPayment="addData"/>
      <br/>
      <PaymentsDisplay :list="displayList(this.elementsOnPage, this.startPosition)" :startPosition="startPosition" />
      <Pagination :elementsOnPage="elementsOnPage" :startPosition="startPosition" :paymentsListLength="paymentsListLength" @newStartPosition="newStartPosition"/>
    </main>
  </div>
</template>

<script>
import PaymentsDisplay from "./components/PaymentsDisplay.vue";
import AddPayment from "./components/AddPayment.vue";
import Pagination from "./components/Pagination";
import { mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  name: "App",
  components: {
    Pagination,
    PaymentsDisplay,
    AddPayment
  },
  data: () => ({
    elementsOnPage: 5,
    startPosition: 0,
    paymentsList: [],
    data: {
      form :  "qw"
    }
  }),
  methods: {
    newStartPosition(newStartPosition){
      this.startPosition = newStartPosition;
    },
    displayList(elementsOnPage, startPosition) {
      let displayList = [];
      for (let i = startPosition; i < (elementsOnPage + startPosition); i++) {
        displayList.push(this.paymentsList[i]);
      }
      // console.log(`элементы для отображения: ${ displayList }`)
      return displayList;
    },
    addData(data){
      // console.log("push to state",data)
      // this.paymentsList.push(data)
      this.paymentsList = [...this.paymentsList, data]
    },
    fetchData(url) {
      return fetch(url)
          .then(result => result.json())
          .catch(error => console.log(error))
    }
  },
  computed: {
    paymentsListLength(){
      return this.paymentsList.length;
    },
  },
  created() {
    this.fetchData("https://raw.githubusercontent.com/mrmeihem/vue-js/main/spendings.json")
        .then(data => {
          console.log(data);
          for (let item of data) {
            this.$data.paymentsList.push(item);
          }
        });
  }
};
</script>

<style lang="scss" module>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  .wrapper {
    text-align: center;
  }
</style>
