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
              <v-icon
                small
                class="mr-2"
                @click="editItem(item)"
              >
                mdi-pencil
              </v-icon>
              <v-icon
                small
                @click="deleteItem(item)"
              >
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>

      </div>

</template>

<script>
export default {
    name: "PaymentsDisplay",
    props: {
        list: {
            type: Array,
            default: ()=>[]
        },
        headers: {
            type: Array,
            default: ()=>[]
        }
    },
  methods: {
    editItem(item) {
      console.log(item.id);
    },
    deleteItem(item) {
      console.log(item.id);
    },
    contextButtonHandler(event, item) {
      console.log(item.id);
      this.$context.show({event, item});
    }
  }
}
</script>

<style lang="scss">

  // .context {
  //   width: 30px;
  //   height: 30px;
  //   transform: rotate(90deg);
  //   padding-bottom: 8px;
  // }

  // .payments-list {
  //   display: flex;
  //   justify-content: center;
  //   margin: 10px;
  // }
  // table {
  //   text-decoration: none;
  //   border-collapse:collapse;
  //   text-align:center;
  //   vertical-align: middle;
  //   border: 2px solid #f0f0f0;
  //   width: 650px;
  //   position: relative;
  // }
  // td {
  //   white-space:pre-wrap;
  //   padding:10px 30px;
  // }

</style>