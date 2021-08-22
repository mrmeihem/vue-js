<template>
  <div>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on">
            Add element
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">Add Payment</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="date"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="date"
                        label="Picker in menu"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="date" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menu = false">
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.menu.save(date)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12">
                  <v-select
                    :items="this.$store.getters.getCategoryList"
                    label="Category*"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Amount*"
                    value="100"
                    prefix="₽"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Close
            </v-btn>
            <v-btn color="blue darken-1" text @click="onClick">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- <button
      class="addbutton"
      v-show="addButton"
      @click="addButton = !addButton"
    >
      Add element
    </button> -->
    <!-- <div class="addwindow" v-show="!addButton">
      <button class="closebutton" @click="addButton = !addButton">
        <span>+</span>
      </button>
      <input type="date" v-model="date" placeholder="date" />
      <select v-model.trim="category">
        <option value="">-Please choose an option--</option>
        <option v-for="item in categories" :key="item" v-bind:item="item">{{
          item
        }}</option>
      </select>
      <input v-model.number="value" type="number" placeholder="value" />
      <button @click="onClick">
        Add Data
      </button>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "AddPayment",
  props: {
    categories: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      dialog: false,
      // addButton: true,
      // date2: "",
      category: "",
      value: null,
    };
  },
  methods: {
    goToHomePage() {
      this.$router.push({
        name: "Home",
      });
    },
    onClick() {
      const { category, value } = this;
      const data = {
        date: this.date || this.getCurrentDate,
        category,
        value,
      };
      console.log("add", data);
      //Вызов события, название события и аргументы
      if (this.getValueQueryFromRoute && this.getCategoryParamsFromRoute) {
        this.$store.commit("addDataToPaymentsList", data);
        this.goToHomePage();
        return;
      }
      this.$emit("addNewPayment", data);
    },
    // onClick(){
    //     const { category, value } = this
    //     const data = {
    //         date: this.date || this.getCurrentDate,
    //         category,
    //         value
    //     }
    //     this.$emit('addNewPayment', data)
    // }
  },
  computed: {
    getCurrentDate() {
      const today = new Date();
      const d = today.getDate();
      const m = today.getMonth() + 1;
      const y = today.getFullYear();
      return `${d}.${m}.${y}`;
    },
    getValueQueryFromRoute() {
      return Number(this.$route.query?.value) ?? null;
    },
    getCategoryParamsFromRoute() {
      return this.$route.params?.category ?? null;
    },
  },
  created() {
    if (
      (!this.getValueQueryFromRoute || !this.getCategoryParamsFromRoute) &&
      this.$route.name !== "Home"
    ) {
      this.goToHomePage();
    }
    this.category = this.getCategoryParamsFromRoute;
    this.value = this.getValueQueryFromRoute;
  },
};
</script>

<style lang="scss" scoped>
// .addbutton {
//   box-sizing: border-box;
//   padding: 10px;
//   background-color: transparent;
//   border: #0085a3 solid 1px;
//   text-transform: uppercase;
// }
// .closebutton {
//   box-sizing: border-box;
//   padding: 10px;
//   background-color: transparent;
//   border: none;
//   text-transform: uppercase;
//   position: absolute;
//   top: -12px;
//   right: -7px;
//   span {
//     transform: rotate(45deg);
//     display: block;
//     font-size: 1.8em;
//   }
// }
// .addwindow {
//   display: flex;
//   justify-content: center;
//   flex-direction: column;
//   gap: 12px;
//   box-sizing: border-box;
//   padding: 20px;
//   margin: 0 auto;
//   width: 500px;
//   border: #0085a3 solid 1px;
//   position: relative;
//   input {
//     height: 23px;
//   }
//   input:first-child {
//     height: 25px;
//   }
//   select {
//     padding: 5px;
//   }
// }
</style>
