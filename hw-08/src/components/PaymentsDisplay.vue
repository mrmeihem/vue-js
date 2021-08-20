<template>

      <div class="payments-list">
        {{ this.headers }}

          <v-data-table
            dense
            :headers="headers"
            :items="list"
            item-key="name"
            class="elevation-1"
          ></v-data-table>

        <table>
          <tr v-for="item in list" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.date }}</td>
            <td>{{ item.category }}</td>
            <td>{{ item.value }}</td>
            <td>
              <button class="context" @click="contextButtonHandler($event, item)" :key="item.id">...</button>
            </td>
          </tr>
        </table>
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
    contextButtonHandler(event, item) {
      console.log(item.id);
      this.$context.show({event, item});
    }
  }
}
</script>

<style lang="scss">

  .context {
    width: 30px;
    height: 30px;
    transform: rotate(90deg);
    padding-bottom: 8px;
  }

  .payments-list {
    display: flex;
    justify-content: center;
    margin: 10px;
  }
  table {
    text-decoration: none;
    border-collapse:collapse;
    text-align:center;
    vertical-align: middle;
    border: 2px solid #f0f0f0;
    width: 650px;
    position: relative;
  }
  td {
    white-space:pre-wrap;
    padding:10px 30px;
  }

</style>