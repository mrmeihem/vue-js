<template>
  <div class="payments-list">
    <table border="1px">
      <tr v-for="(item, idx) in list" :key="idx">
        <td>{{ idx + 1 + startPosition }}</td>
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
        },
        startPosition: {
            type: Number
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