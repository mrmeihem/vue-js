<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Logo"
          class="shrink mr-2"
          contain
          src="./assets/logo_.png"
          transition="scale-transition"
          height="48"
        />
      </div>
      <v-spacer></v-spacer>
      <v-btn to="/" text>
        <span class="mr-2">Home</span>
      </v-btn>
      <v-btn to="/About" text>
        <span class="mr-2">About</span>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "App",

  data: () => ({}),
  methods: {
    ...mapActions(["fetchData", "fetchCategory", "fetchHeaders"]),
    ...mapMutations(["setChartData"]),
    calculateChartData() {
      console.log("two");
      console.log(this.$store.getters.getCategoryListLength);
      console.log(this.$store.getters.getPaymentListLength);
      console.log("two");

      let paymentsSumArr = Array(5).fill(0);
      this.paymentsList.forEach((element) => {
        for (let i = 0; i < this.categoryLength; i++) {
          if (this.categories[i] === element.category) {
            paymentsSumArr[i] += +element.value;
          }
        }
      });
      console.log(paymentsSumArr);
      this.$store.commit("setChartData", paymentsSumArr);
    },
  },
  computed: {
    ...mapGetters({
      paymentsList: "getPaymentList",
      categories: "getCategoryList",
      categoryLength: "getCategoryListLength",
    }),
  },
  created() {
    // at created getting categories and data lists
    this.$store.dispatch("fetchData");
    this.$store.dispatch("fetchHeaders");
    this.$store.dispatch("fetchCategories");
    // running a method to calculate dataset for the chart
  },
  mounted() {
    console.log("created");
    this.calculateChartData();
  },
};
</script>
