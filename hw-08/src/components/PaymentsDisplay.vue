<template>
  <div class="payments-list">
    <v-data-table
      dense
      :headers="headers"
      :items="list"
      item-key="name"
      class="elevation-1"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteDialog(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="290">
        <v-card>
          <v-card-title class="text-h5">
            Are you sure you want to delete this item?
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="deleteItem()">
              Yes
            </v-btn>
            <v-btn color="green darken-1" text @click="closeDeleteDialog()">
              No
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "PaymentsDisplay",
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    headers: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      dialog: false,
      itemId: "",
    };
  },

  methods: {
    editItem(data) {
      this.$emit("sendingEditItemData", data);
    },
    deleteDialog(item) {
      this.dialog = true;
      this.itemId = this.list.indexOf(item);
    },
    deleteItem() {
      this.$store.commit("deleteEntryPaymentList", this.itemId);
      this.closeDeleteDialog();
    },
    closeDeleteDialog() {
      this.dialog = false;
    },
  },
};
</script>

<style></style>
