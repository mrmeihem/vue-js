<template>
  <div class="payments-list">
    <table border="1px">
      <tr v-for="item in list" :key="item">
        <td>{{ item.id }}</td>
        <td>{{ item.date }}</td>
        <td>{{ item.category }}</td>
        <td>{{ item.value }}</td>
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
        }
    }
}
</script>

<style lang="scss" scoped>

  .payments-list {
    display: flex;
    justify-content: center;
  }
  table {
    text-decoration: none;
    border-collapse:collapse;
    text-align:center;
    vertical-align: middle;
    border: 2px solid #f0f0f0;
    width: 500px;
  }
  td {
    white-space:pre-wrap;
    padding:10px 30px;
  }

</style>