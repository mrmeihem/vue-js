<template>
  <div>
    <v-dialog v-model="editDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Edit Payment</span>
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
                      // Cancel
                    </v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(date)">
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="category"
                  :items="this.$store.getters.getCategoryList"
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
          <v-btn color="blue darken-1" text @click="closeEditDialog()">
            Close
          </v-btn>
          <v-btn
            :disabled="!formIsValid"
            color="blue darken-1"
            text
            @click="saveEditedItem()"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "EditPayment",
  data() {
    return {
      editDialog: false,
      menu: false,
      itemId: 0,
      date: "",
      category: "",
      value: 0,
    };
  },
  methods: {
    initEditDialog(data) {
      const list = this.$store.getters.getPaymentList;
      this.editDialog = true;
      this.itemId = list.indexOf(data);
      this.date = data.date;
      this.category = data.category;
      this.value = data.value;
    },
    closeEditDialog() {
      this.editDialog = false;
    },
    saveEditedItem() {
      const { category, value, date, itemId } = this; // disable?
      const data = {
        category,
        value,
        date,
        itemId,
      };
      this.$emit("saveEditedPayment", data);
      this.$store.commit("saveEditedEntryPaymentList", data);
      this.closeEditDialog();
    },
  },
  computed: {
    formIsValid() {
      return this.category && this.value;
    },
    ...mapGetters({
      categories: "getCategoryList",
    }),
  },
};
</script>

<style></style>
