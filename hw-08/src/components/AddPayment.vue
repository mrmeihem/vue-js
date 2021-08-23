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
                    v-model="category"
                    :items="categoriesList"
                    label="Category*"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    type="number"
                    v-model="value"
                    label="Amount*"
                    prefix="₽"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="resetAndCloseForm">
              Close
            </v-btn>
            <v-btn
              :disabled="!formIsValid"
              color="blue darken-1"
              text
              @click="onClick"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
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
      date: "",
      menu: false,
      dialog: false,
      category: "",
      value: "",
    };
  },
  methods: {
    goToHomePage() {
      this.$router.push({
        name: "Home",
      });
    },
    resetAndCloseForm() {
      this.category = "";
      this.value = "";
      this.date = "";
      this.dialog = false;
    },
    onClick() {
      const { category, value } = this;
      const data = {
        id: this.$store.getters.getPaymentListLength + 1,
        date: this.date || this.getCurrentDate,
        category,
        value,
      };
      this.$emit("addNewPayment", data);
      this.resetAndCloseForm();
    },
  },
  computed: {
    categoriesList() {
      return this.$store.getters.getCategoryList;
    },
    formIsValid() {
      return this.category && this.value;
    },
    getCurrentDate() {
      return new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10);
    },
  },
};
</script>

<style></style>
