<script>
import { Doughnut, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Doughnut,
  props: ["chartData", "options"],
  mixins: [reactiveProp],
  watch: {
    chartData: {
      deep: true,
      handler(newdata, olddata) {
        console.log(
          JSON.stringify(newdata.dataset) === JSON.stringify(olddata.dataset)
        );
        // if (newdata !== olddata) {
        console.log("its updated");
        this.renderChart(this.chartData, this.options);
        console.log(this);
        // }
      },
    },
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
};
</script>

<style></style>
