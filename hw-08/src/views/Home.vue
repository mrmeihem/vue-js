<template>
  <v-container>
    <EditPayment @saveEditedPayment="saveEditedPayment" ref="editPayment" />
    <v-row>
      <v-col cols="9">
        <AddPayment :categories="categories" @addNewPayment="addData" />
      </v-col>
      <v-col cols="9">
        <PaymentsDisplay
          :list="this.getPaymentList()"
          :headers="this.getHeaders()"
          @sendingEditItemData="sendingEditItemData"
          @sendingDeleteItemData="sendingDeleteItemData"
        />
      </v-col>
      <v-col cols="3">
        <Chart :chartData="chartData" :options="options" ref="Chart" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PaymentsDisplay from "../components/PaymentsDisplay.vue";
import AddPayment from "../components/AddPayment.vue";
import Chart from "../components/Chart.vue";
import { mapMutations, mapGetters } from "vuex";
import EditPayment from "../components/EditPayment";

export default {
  name: "App",
  components: {
    PaymentsDisplay,
    AddPayment,
    EditPayment,
    Chart,
  },
  data() {
    return {
      editDialog: false,
      options: {},
      chartData: {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels: ["one"],
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
            data: [1],
          },
        ],
      },
    };
  },
  methods: {
    ...mapMutations(["setPaymentListData", "addDataToPaymentsList"]),
    sendingEditItemData(data) {
      this.$refs.editPayment.initEditDialog(data);
    },
    sendingDeleteItemData() {
      this.calculateChartData();
    },
    saveEditedPayment() {
      this.calculateChartData();
    },
    getPaymentList() {
      return this.$store.state.paymentsList;
    },
    getHeaders() {
      return this.$store.state.headers;
    },
    addData(data) {
      this.addDataToPaymentsList(data);
      this.calculateChartData();
    },
    calculateChartData() {
      const categoriesList = this.categories;
      this.chartData.labels.length = 0;
      this.chartData.labels.push(...categoriesList);
      const paymentsList = this.paymentsList;
      let paymentsSumArr = [0, 0, 0, 0, 0];
      paymentsList.forEach((element) => {
        for (let i = 0; i < categoriesList.length; i++) {
          if (this.chartData.labels[i] === element.category) {
            paymentsSumArr[i] += +element.value;
          }
        }
      });
      this.chartData.datasets[0].data.length = 0;
      this.chartData.datasets[0].data.push(...paymentsSumArr);
      console.log(this.chartData.datasets[0].data);
      // this.$refs.Chart.built();
    },
  },
  computed: {
    ...mapGetters({
      paymentsList: "getPaymentList",
      categories: "getCategoryList",
    }),
  },
  created() {
    this.calculateChartData();
  },
};
</script>

<style>
#app {
  margin-top: 40px;
}
</style>
